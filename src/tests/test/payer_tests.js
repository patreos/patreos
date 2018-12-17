Eos = require('eosjs')
var fs = require("fs");
var assert = require('assert');
var accounts = fs.readFileSync("accounts.json");

var messagesModule = require("./messages.js");
var configModule = require("./config.js");

var TransactionBuilder = require('../../utils/transaction_builder');

process.on('unhandledRejection', (reason, promise) => {
  //console.log('Unhandled Rejection at:', reason.stack || reason)
  // Recommended: send the information to sentry.io
  // or whatever crash reporting service you use
})

var config = configModule.config;
var messages = messagesModule.messages;

eos = Eos(config.eos);

const transaction_builder = new TransactionBuilder(config);

describe('Patreos Payer Tests', function() {

  it('Deposit PATR into patreospayer', function(done) {
    let tx = transaction_builder.transfer('xokayplanetx', 'patreospayer', '1.0000','STAKE <3','patreostoken', 'PATR');
    eos.transaction(tx).then((response) => {
      let depositBalanceIntoVault = response.processed.receipt.status;
      assert.equal('executed', depositBalanceIntoVault);
      done();
    }).catch(err => {
      console.log(err)
      assert.strictEqual(0, 1, 'Transaction was not successful');
      done();
    });
  });

  it('Register Service Provider', function(done) {
    let tokens = [
      {
        "token_contract": "eosio.token",
        "flat_fee": "0 EOS",
        "percentage_fee": 0.00
      },
      {
        "token_contract": "patreostoken",
        "flat_fee": "0 PATR",
        "percentage_fee": 0.00
      }
    ];
    let tx = transaction_builder.regservice('xokayplanetx', tokens);
    eos.transaction(tx).then((response) => {
      let registeredStatus = response.processed.receipt.status;
      assert.equal('executed', registeredStatus);
      done();
    }).catch(err => {
      console.log(err)
      assert.strictEqual(0, 1, 'Transaction was not successful');
      done();
    });
  });

});
