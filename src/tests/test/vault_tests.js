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

describe('Patreos Vault Tests', function() {

  it('Cannot withdraw PATR from vault without balance', function(done) {
    let tx = transaction_builder.withdraw('nomoneyuser1', '1.0000', 'PATR');
    eos.transaction(tx).then((response) => {
      console.log(response)
      assert.fail(0, 1, 'Transaction was successful but should have failed');
      done();
    }).catch(err => {
      error = JSON.parse(err).error;
      let patrWithdrawFromVaultWithoutBalance = error.details[0].message;
      assert.ok(patrWithdrawFromVaultWithoutBalance.includes(messages.NO_BALANCE_FOR_TOKEN));
      done();
    });
  });

  it('Cannot withdraw EOS from vault without balance', function(done) {
    let tx = transaction_builder.withdraw('nomoneyuser1', '1.0000', 'EOS');
    eos.transaction(tx).then((response) => {
      console.log(response)
      assert.fail(0, 1, 'Transaction was successful but should have failed');
      done();
    }).catch(err => {
      error = JSON.parse(err).error;
      let eosWithdrawFromVaultWithoutBalance = error.details[0].message;
      assert.ok(eosWithdrawFromVaultWithoutBalance.includes(messages.NO_BALANCE_FOR_TOKEN));
      done();
    });
  });

  it('Cannot withdraw negative PATR from vault', function(done) {
    let tx = transaction_builder.withdraw('xokayplanetx', '-1.0000', 'PATR');
    eos.transaction(tx).then((response) => {
      console.log(response)
      assert.fail(0, 1, 'Transaction was successful but should have failed');
      done();
    }).catch(err => {
      error = JSON.parse(err).error;
      let patrWithdrawNegativeBalanceFromVault = error.details[0].message;
      assert.ok(patrWithdrawNegativeBalanceFromVault.includes(messages.NEED_POSITIVE_TRANSFER_QUANTITY));
      done();
    });
  });

  it('Cannot withdraw negative EOS from vault', function(done) {
    let tx = transaction_builder.withdraw('xokayplanetx', '-1.0000', 'EOS');
    eos.transaction(tx).then((response) => {
      console.log(response)
      assert.fail(0, 1, 'Transaction was successful but should have failed');
      done();
    }).catch(err => {
      error = JSON.parse(err).error;
      let eosWithdrawNegativeBalanceFromVault = error.details[0].message;
      assert.ok(eosWithdrawNegativeBalanceFromVault.includes(messages.NEED_POSITIVE_TRANSFER_QUANTITY));
      done();
    });
  });

  it('Deposit PATR into vault', function(done) {
    let tx = transaction_builder.transfer('xokayplanetx', 'patreosvault', '1.0000','STAKE <3','patreostoken', 'PATR');
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

});
