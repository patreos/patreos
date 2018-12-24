class TransactionBuilder {

  constructor(config) {
    this.config = config;
  }

  // A custom transfer function for any eosio.token-like contract
	transfer(_from, _to, _quantity, _memo='', _code='eosio.token', _symbol='EOS', _permission='active') {
		return {
			actions: [{
				account: _code,
				name: 'transfer',
				authorization: [{
					actor: _from,
					permission: _permission
				}],
				data: {
					from: _from,
					to: _to,
					quantity: _quantity + ' ' + _symbol,
					memo: _memo
				}
			}]
		}
	}

	withdraw(_from, _quantity, _symbol='EOS', _permission='active') {
		return {
			actions: [{
				account: this.config.code.patreosvault,
				name: 'withdraw',
				authorization: [{
					actor: _from,
					permission: _permission
				}],
				data: {
					owner: _from,
					quantity: _quantity + ' ' + _symbol
				}
			}]
		}
	}

  // A custom transfer function for any eosio.token-like contract
  stake(_from, _quantity, _memo='', _permission='active') {
    return {
			actions: [{
				account: this.config.code.patreostoken,
				name: 'stake',
				authorization: [{
					actor: _from,
					permission: _permission
				}],
				data: {
					account: _from,
					quantity: _quantity + ' ' + this.config.patreosSymbol,
					memo: _memo
				}
			}]
		}
  }

  // A custom transfer function for any eosio.token-like contract
  unstake(_from, _quantity, _memo='', _permission='active') {
    return {
      actions: [{
        account: this.config.code.patreostoken,
        name: 'unstake',
        authorization: [{
          actor: _from,
          permission: _permission
        }],
        data: {
          account: _from,
          quantity: _quantity + ' ' + this.config.patreosSymbol,
          memo: _memo
        }
      }]
    }
  }

  // A basic alert method that uses memo for alert data
  blurb(_from, _to, _memo='a basic blurb', _permission='active') {
		return {
			actions: [{
				account: this.config.code.patreosblurb,
				name: 'blurb',
				authorization: [{
					actor: _from,
					permission: _permission
				}],
				data: {
					from: _from,
					to: _to,
					memo: _memo
				}
			}]
		}
	}

  // Pledge a quantity to creator every n-days
  pledge(_from, _to, _quantity, _days, _permission='active') {
    return {
      actions: [{
        account: this.config.code.patreosnexus,
        name: 'pledge',
        authorization: [{
          actor: _from,
          permission: _permission
        }],
        data: {
          pledger: _from,
          _pledge: {
            creator: _to,
            quantity: _quantity + ' ' + this.config.patreosSymbol,
            seconds: 10,
            last_pledge: 0,
            execution_count: 0
          }
        }
      }]
    }
  }

  emptyVaultPledge(_from, _to, _quantity, _memo='', _code='eosio.token', _symbol='EOS', _permission='active') {
    return {
      actions: [{
				account: _code,
				name: 'transfer',
				authorization: [{
					actor: _from,
					permission: _permission
				}],
				data: {
					from: _from,
					to: this.config.code.patreosvault,
					quantity: _quantity + ' ' + _symbol,
					memo: _memo
				}
			},
      {
        account: this.config.code.patreosnexus,
        name: 'pledge',
        authorization: [{
          actor: _from,
          permission: _permission
        }],
        data: {
          pledger: _from,
          _pledge: {
            creator: _to,
            quantity: _quantity + ' ' + this.config.patreosSymbol,
            seconds: 10,
            last_pledge: 0,
            execution_count: 0
          }
        }
      }]
    }
  }

  unpledge(_from, _to, _permission='active') {
    return {
      actions: [{
        account: this.config.code.patreosnexus,
        name: 'unpledge',
        authorization: [{
          actor: _from,
          permission: _permission
        }],
        data: {
          pledger: _from,
          creator: _to
        }
      }]
    }
  }

  regservice(_provider, raw_service_tokens, _permission='active') {
    return {
      actions: [{
        account: this.config.code.patreospayer,
        name: 'regservice',
        authorization: [{
          actor: _provider,
          permission: _permission
        }],
        data: {
          provider: _provider,
          valid_tokens: raw_service_tokens
        }
      }]
    }
  }

/*
uint64_t id;
name from;
name to;
payer_token payer_token_amount;
uint64_t cycle;
uint64_t last_executed;
asset fee;
*/

  _build_agreement(_from, _to, _quantity, _token_contract, _cycle) {
    return {
      "from": _from,
      "to": _to,
      "token_profile_amount": {
        "contract": _token_contract,
        "quantity": _quantity
      },
      "cycle": _cycle
    }
  }

  subscribe(_provider, _agreement, _permission='active') {
    return {
      actions: [{
        account: this.config.code.patreospayer,
        name: 'subscribe',
        authorization: [{
          actor: _agreement.from,
          permission: _permission
        }],
        data: {
          provider: _provider,
          agreement: _agreement
        }
      }]
    }
  }

  unsubscribe(_provider, _from, _to, _permission='active') {
    return {
      actions: [{
        account: this.config.code.patreospayer,
        name: 'unsubscribe',
        authorization: [{
          actor: _from,
          permission: _permission
        }],
        data: {
          provider: _provider,
          from: _from,
          to: _to
        }
      }]
    }
  }

  process(_provider, _from, _to, _permission='active') {
    return {
      actions: [{
        account: this.config.code.patreospayer,
        name: 'process',
        authorization: [{
          actor: _from,
          permission: _permission
        }],
        data: {
          provider: _provider,
          from: _from,
          to: _to
        }
      }]
    }
  }

  // Creator publishes new content
  publish(_from, _title, _description, _url) {}

  // Update basic profile information
  set_profile(_account, _name, _description, _img_url) {}
  unset_profile(_account) {}

}

module.exports = TransactionBuilder
