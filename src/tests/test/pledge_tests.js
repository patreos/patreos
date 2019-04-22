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

const transaction_builder = new TransactionBuilder(config);

describe('Patreos Pledge Tests', function() {

  it('Set profile for testplanet1x', function(done) {
    let tx = transaction_builder.set_profile('testplanet1x', 'Test Planet 1x', 'Just a modest description', "", "", [ { service: "twitter", profile_url: "https://twitter.com/PatreosDapp"} ]);
    eos.transaction(tx).then((response) => {
      let result = response.processed.receipt.status;
      assert.equal('executed', result);
      done();
    }).catch(err => {
      console.log(err)
      assert.fail(0, 1, 'Transaction was not successful');
      done();
    });
  });

  it('Unset profile for testplanet1x', function(done) {
    let tx = transaction_builder.unset_profile('testplanet1x');
    eos.transaction(tx).then((response) => {
      let result = response.processed.receipt.status;
      assert.equal('executed', result);
      done();
    }).catch(err => {
      console.log(err)
      assert.fail(0, 1, 'Transaction was not successful');
      done();
    });
  });

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
