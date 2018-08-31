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

  // Creator publishes new content
  publish(_from, _title, _description, _url) {}

  // Pledge a quantity to creator every n-days
  pledge(_from, _to, _quantity, _days) {}
  unpledge(_from, _to) {}

  // A simple follow to a creator
  subscribe(_from, _to) {}
  unsubscribe(_from, _to) {}

  // Update basic profile information
  set_profile(_account, _name, _description, _img_url) {}
  unset_profile(_account) {}

  // Only staked PTR can be managed by subscription services
  stake(_account, _quantity) {}

}

module.exports = TransactionBuilder
