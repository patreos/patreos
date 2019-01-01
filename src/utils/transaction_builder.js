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

  // A custom transfer function for any eosio.token-like contract
  stake(_from, _quantity, _permission='active') {
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
					quantity: _quantity + ' ' + this.config.patreosSymbol
				}
			}]
		}
  }

  // A custom transfer function for any eosio.token-like contract
  unstake(_from, _quantity, _permission='active') {
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
          quantity: _quantity + ' ' + this.config.patreosSymbol
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
  pledge(_from, _to, _quantity, _cycle, _code='eosio.token', _symbol='EOS', _permission='active') {
    var _asset = _quantity + ' ' + _symbol;
    var _agreement = this._build_agreement(_from, _to, _asset, _code, _cycle);
    return {
      actions: [{
        account: this.config.code.recurringpay,
        name: 'subscribe',
        authorization: [{
          actor: _from,
          permission: _permission
        }],
        data: {
          provider: 'patreosnexus',
          agreement: _agreement
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
          from: _from,
          to: _to
        }
      }]
    }
  }

  recurringpayDepositThenExecutePledge(_from, _to, _quantity, _cycle, _memo='', _code='eosio.token', _symbol='EOS', _permission='active') {
    var _asset = _quantity + ' ' + _symbol;
    var _agreement = this._build_agreement(_from, _to, _asset, _code, _cycle);
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
					to: this.config.code.recurringpay,
					quantity: _asset,
					memo: _memo
				}
			},
      {
        account: this.config.code.recurringpay,
        name: 'subscribe',
        authorization: [{
          actor: _from,
          permission: _permission
        }],
        data: {
          provider: 'patreosnexus',
          agreement: _agreement
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
          from: _from,
          to: _to
        }
      }]
    }
  }

  unpledge(_from, _to, _permission='active') {
    return {
      actions: [{
        account: this.config.code.recurringpay,
        name: 'unsubscribe',
        authorization: [{
          actor: _from,
          permission: _permission
        }],
        data: {
          provider: 'patreosnexus',
          from: _from,
          to: _to
        }
      },
      {
        account: this.config.code.patreosnexus,
        name: 'unpledge',
        authorization: [{
          actor: _from,
          permission: _permission
        }],
        data: {
          from: _from,
          to: _to
        }
      }]
    }
  }

  addtokens(_provider, raw_service_tokens, _permission='active') {
    return {
      actions: [{
        account: this.config.code.recurringpay,
        name: 'addtokens',
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

  _build_agreement(_from, _to, _quantity, _token_contract, _cycle_seconds) {
    return {
      "from": _from,
      "to": _to,
      "token_profile_amount": {
        "contract": _token_contract,
        "quantity": _quantity
      },
      "cycle_seconds": _cycle_seconds
    }
  }

  subscribe(_provider, _agreement, _permission='active') {
    return {
      actions: [{
        account: this.config.code.recurringpay,
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
        account: this.config.code.recurringpay,
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
        account: this.config.code.recurringpay,
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

  withdraw(_from, _contract, _quantity, _permission='active') {
    return {
      actions: [{
        account: this.config.code.recurringpay,
        name: 'withdraw',
        authorization: [{
          actor: _from,
          permission: _permission
        }],
        data: {
          owner: _from,
          contract: _contract,
          quantity: _quantity
        }
      }]
    }
  }

  unregservice(_provider, _permission='active') {
    return {
      actions: [{
        account: this.config.code.recurringpay,
        name: 'unregservice',
        authorization: [{
          actor: _provider,
          permission: _permission
        }],
        data: {
          provider: _provider
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
