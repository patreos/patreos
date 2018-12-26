Eos = require('eosjs')
var fs = require("fs");
var assert = require('assert');
var accounts = fs.readFileSync("accounts.json");

var messagesModule = require("./messages.js");
var configModule = require("../../config/test_config.js");

var TransactionBuilder = require('../../utils/transaction_builder');

process.on('unhandledRejection', (reason, promise) => {
  //console.log('Unhandled Rejection at:', reason.stack || reason)
  // Recommended: send the information to sentry.io
  // or whatever crash reporting service you use
})

var config = configModule.config.development;
var messages = messagesModule.messages;

eos = Eos(config.eos);

const transaction_builder = new TransactionBuilder(config);

describe('Patreos Pledge Tests', function() {
/*
  it('Should error when pledge of min value is not met', function(done) {
    let tx = transaction_builder.pledge('xokayplanetx', 'patreosnexus', '1.0000', 10);
    eos.transaction(tx).then((response) => {
      assert.fail(0, 1, 'Transaction was successful but should have failed');
      done();
    }).catch(err => {
      error = JSON.parse(err).error;
      let verifyPledgeIsAboveMinQuantity = error.details[0].message;
      assert.ok(verifyPledgeIsAboveMinQuantity.includes(messages.NEED_MIN_QUANTITY));
      done();
    });
  });

  it('Should execute successfully', function(done) {
    let tx = transaction_builder.pledge('xokayplanetx', 'patreosnexus', '51.0000', 10);
    eos.transaction(tx).then((response) => {
      let successfulPledge = response.processed.receipt.status;
      assert.equal('executed', successfulPledge);
      done();
    }).catch(err => {
      console.log(err)
      assert.fail(0, 1, 'Transaction was not successful');
      done();
    });
  });

  it('Should error on duplicate pledge', function(done) {
    let tx = transaction_builder.pledge('xokayplanetx', 'patreosnexus', '55.0000', 10);
    eos.transaction(tx).then((response) => {
      console.log(response)
      assert.fail(0, 1, 'Transaction was successful but should have failed');
      done();
    }).catch(err => {
      error = JSON.parse(err).error;
      let verifyPledgeDNE = error.details[0].message;
      assert.ok(verifyPledgeDNE.includes(messages.PLEDGE_EXISTS));
      done();
    });
  });

  it('Removed pledge successfully', function(done) {
    let tx = transaction_builder.unpledge('xokayplanetx', 'patreosnexus')
    eos.transaction(tx).then((response) => {
      let removedPledge = response.processed.receipt.status;
      assert.equal('executed', removedPledge);
      done();
    }).catch(err => {
      console.log(err)
      assert.fail(0, 1, 'Transaction was not successful');
      done();
    });
  });

  it('Should have sufficient funds for pledge', function(done) {
    let tx = transaction_builder.pledge('xokayplanetx', 'patreosnexus', '200.0000', 10);
    eos.transaction(tx).then((response) => {
      console.log(response)
      assert.fail(0, 1, 'Transaction was successful but should have failed');
      done();
    }).catch(err => {
      error = JSON.parse(err).error;
      let verifyHasPledgeFunds = error.details[0].message;
      assert.ok(verifyHasPledgeFunds.includes(messages.NEED_PLEDGE_FUNDS));
      done();
    });
  });
*/
});
