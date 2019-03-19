Eos = require('eosjs')
const fs = require("fs");
const assert = require('assert');
const accounts = JSON.parse(fs.readFileSync("accounts.json"));
const messagesModule = require("./messages.js");
const configModule = require("../../config/test_config.js");
const bignum = require('bignum');
const TransactionBuilder = require('../../utils/transaction_builder');

process.on('unhandledRejection', (reason, promise) => {
  //console.log('Unhandled Rejection at:', reason.stack || reason)
  // Recommended: send the information to sentry.io
  // or whatever crash reporting service you use
})

var config = configModule.config.development;
config.eos.keyProvider = [
  accounts.contracts[0].private_key, //patreostoken
  accounts.contracts[1].private_key, //patreosnexus
  accounts.contracts[3].private_key, //patreosmoney
  accounts.users[0].private_key, //xokayplanetx
  accounts.users[2].private_key, //testplanet1x
  accounts.users[3].private_key, //testplanet2x
  accounts.users[4].private_key, //testplanet3x
  accounts.users[9].private_key //patreosvault
];
const messages = messagesModule.messages;

eos = Eos(config.eos);
//console.log(config.eos.keyProvider)

const transaction_builder = new TransactionBuilder(config);

function combineIds(name1, name2) {
  let encodedNameOne = Eos.modules.format.encodeName(name1, false);
  let encodedNameTwo = Eos.modules.format.encodeName(name2, false);
  let binaryNumber = bignum(encodedNameOne, 10);
  binaryNumber = binaryNumber.shiftLeft(64);
  binaryNumber = binaryNumber.or(encodedNameTwo);
  return binaryNumber;
}

describe('Tests for patreosmoney', function() {

  it('xokayplanetx Transfers PATR to testplanet1x', function(done) {
    let tx = transaction_builder.transfer('xokayplanetx', 'testplanet1x', '16.0000','Xfer','patreostoken', 'PATR');
    eos.transaction(tx).then((response) => {
      let depositBalanceIntoVault = response.processed.receipt.status;
      assert.equal('executed', depositBalanceIntoVault);
      done();
    }).catch(err => {
      console.log(err)
      assert.fail(0, 1, 'Transaction was not successful');
      done();
    });
  });

  it('xokayplanetx Stakes PATR', function(done) {
    let tx = transaction_builder.stake('xokayplanetx', '1.0000');
    eos.transaction(tx).then((response) => {
      let depositBalanceIntoVault = response.processed.receipt.status;
      assert.equal('executed', depositBalanceIntoVault);
      done();
    }).catch(err => {
      console.log(err)
      assert.fail(0, 1, 'Transaction was not successful');
      done();
    });
  });

  it('testplanet1x Transfers PATR to testplanet2x', function(done) {
    let tx = transaction_builder.transfer('testplanet1x', 'testplanet2x', '8.0000','Xfer 2','patreostoken', 'PATR');
    eos.transaction(tx).then((response) => {
      let depositBalanceIntoVault = response.processed.receipt.status;
      assert.equal('executed', depositBalanceIntoVault);
      done();
    }).catch(err => {
      console.log(err)
      assert.fail(0, 1, 'Transaction was not successful');
      done();
    });
  });

  it('testplanet1x Stakes PATR', function(done) {
    let tx = transaction_builder.stake('testplanet1x', '1.0000');
    eos.transaction(tx).then((response) => {
      let depositBalanceIntoVault = response.processed.receipt.status;
      assert.equal('executed', depositBalanceIntoVault);
      done();
    }).catch(err => {
      console.log(err)
      assert.fail(0, 1, 'Transaction was not successful');
      done();
    });
  });

  it('testplanet2x Transfers PATR to testplanet3x', function(done) {
    let tx = transaction_builder.transfer('testplanet2x', 'testplanet3x', '4.0000','Xfer 3','patreostoken', 'PATR');
    eos.transaction(tx).then((response) => {
      let depositBalanceIntoVault = response.processed.receipt.status;
      assert.equal('executed', depositBalanceIntoVault);
      done();
    }).catch(err => {
      console.log(err)
      assert.fail(0, 1, 'Transaction was not successful');
      done();
    });
  });

  it('testplanet2x Stakes PATR', function(done) {
    let tx = transaction_builder.stake('testplanet2x', '1.0000');
    eos.transaction(tx).then((response) => {
      let depositBalanceIntoVault = response.processed.receipt.status;
      assert.equal('executed', depositBalanceIntoVault);
      done();
    }).catch(err => {
      console.log(err)
      assert.fail(0, 1, 'Transaction was not successful');
      done();
    });
  });

  it('testplanet3x Stakes PATR', function(done) {
    let tx = transaction_builder.stake('testplanet3x', '1.2000');
    eos.transaction(tx).then((response) => {
      let depositBalanceIntoVault = response.processed.receipt.status;
      assert.equal('executed', depositBalanceIntoVault);
      done();
    }).catch(err => {
      console.log(err)
      assert.fail(0, 1, 'Transaction was not successful');
      done();
    });
  });

  it('patreosvault setglobal', function(done) {
    let tx = {
			actions: [{
				account: "patreosmoney",
				name: 'setglobal',
				authorization: [{
					actor: "patreosvault",
					permission: "active"
				}],
				data: {
					active_round_duration: 5,
					max_round_lifespan: 60 * 1,
          max_round_payout: '700000 PATR',
          required_votes: 3
				}
			}]
		};
    eos.transaction(tx).then((response) => {
      let depositBalanceIntoVault = response.processed.receipt.status;
      assert.equal('executed', depositBalanceIntoVault);
      done();
    }).catch(err => {
      console.log(err)
      assert.fail(0, 1, 'Transaction was not successful');
      done();
    });
  });

  it('Get globals and verify no votes and not active', function(done) {
    eos.getTableRows({
      "json": true,
      "scope": 'patreosmoney',
      "code": 'patreosmoney',
      "table": "globals",
      "lower_bound": 0,
      "limit": 1
    }).then(result => {
      assert.strictEqual(0, result.rows[0].votes, 'No Votes found');
      assert.strictEqual(0, result.rows[0].active, 'Contract not yet active');
      done();
    }).catch((error) =>{
      console.log(error);
      assert.strictEqual(0, 1, 'Votes not found');
      done();
    });
  });

  it('xokayplanetx votes', function(done) {
    let tx = {
			actions: [{
				account: "patreosmoney",
				name: 'vote',
				authorization: [{
					actor: "xokayplanetx",
					permission: "active"
				}],
				data: {
					account: "xokayplanetx",
					launch: 1,
          max_round_payout: '10000 PATR'
				}
			}]
		};
    eos.transaction(tx).then((response) => {
      let depositBalanceIntoVault = response.processed.receipt.status;
      assert.equal('executed', depositBalanceIntoVault);
      done();
    }).catch(err => {
      console.log(err)
      assert.fail(0, 1, 'Transaction was not successful');
      done();
    });
  });

  it('testplanet1x votes', function(done) {
    let tx = {
      actions: [{
        account: "patreosmoney",
        name: 'vote',
        authorization: [{
          actor: "testplanet1x",
          permission: "active"
        }],
        data: {
          account: "testplanet1x",
          launch: 1,
          max_round_payout: '10000 PATR'
        }
      }]
    };
    eos.transaction(tx).then((response) => {
      let depositBalanceIntoVault = response.processed.receipt.status;
      assert.equal('executed', depositBalanceIntoVault);
      done();
    }).catch(err => {
      console.log(err)
      assert.fail(0, 1, 'Transaction was not successful');
      done();
    });
  });

  it('testplanet2x votes', function(done) {
    let tx = {
      actions: [{
        account: "patreosmoney",
        name: 'vote',
        authorization: [{
          actor: "testplanet2x",
          permission: "active"
        }],
        data: {
          account: "testplanet2x",
          launch: 1,
          max_round_payout: '20000 PATR'
        }
      }]
    };
    eos.transaction(tx).then((response) => {
      let depositBalanceIntoVault = response.processed.receipt.status;
      assert.equal('executed', depositBalanceIntoVault);
      done();
    }).catch(err => {
      console.log(err)
      assert.fail(0, 1, 'Transaction was not successful');
      done();
    });
  });

  it('Get globals and verify votes and active', function(done) {
    eos.getTableRows({
      "json": true,
      "scope": 'patreosmoney',
      "code": 'patreosmoney',
      "table": "globals",
      "lower_bound": 0,
      "limit": 1
    }).then(result => {
      assert.strictEqual(3, result.rows[0].votes, 'Votes found');
      assert.strictEqual(1, result.rows[0].active, 'Contract now active!');
      done();
    }).catch((error) =>{
      console.log(error);
      assert.strictEqual(0, 1, 'Votes not found');
      done();
    });
  });

});
