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
  accounts.contracts[1].private_key, //patreosnexus
  accounts.users[0].private_key, //xokayplanetx
  accounts.users[1].private_key, //testairdropx
  accounts.users[2].private_key, //testplanet1x
  accounts.users[3].private_key //testplanet2x
];
const messages = messagesModule.messages;

eos = Eos(config.eos);

const transaction_builder = new TransactionBuilder(config);

function combineIds(name1, name2) {
  let encodedNameOne = Eos.modules.format.encodeName(name1, false);
  let encodedNameTwo = Eos.modules.format.encodeName(name2, false);
  let binaryNumber = bignum(encodedNameOne, 10);
  binaryNumber = binaryNumber.shiftLeft(64);
  binaryNumber = binaryNumber.or(encodedNameTwo);
  return binaryNumber;
}

describe('Tests for recurringpay', function() {

  it('xokayplanetx Deposits PATR into recurringpay', function(done) {
    let tx = transaction_builder.transfer('xokayplanetx', 'recurringpay', '15.0000','Deposit <3','patreostoken', 'PATR');
    eos.transaction(tx).then((response) => {
      let ret = response.processed.receipt.status;
      assert.equal('executed', ret);
      done();
    }).catch(err => {
      console.log(err)
      assert.strictEqual(0, 1, 'Transaction was not successful');
      done();
    });
  });

  it('testplanet1x Deposits PATR into recurringpay', function(done) {
    let tx = transaction_builder.transfer('testplanet1x', 'recurringpay', '15.0000','Deposit <3','patreostoken', 'PATR');
    eos.transaction(tx).then((response) => {
      let ret = response.processed.receipt.status;
      assert.equal('executed', ret);
      done();
    }).catch(err => {
      console.log(err)
      assert.strictEqual(0, 1, 'Transaction was not successful');
      done();
    });
  });

  it('xokayplanetx Deposits EOS into recurringpay', function(done) {
    let tx = transaction_builder.transfer('xokayplanetx', 'recurringpay', '2.0000','Deposit <3','eosio.token', 'EOS');
    eos.transaction(tx).then((response) => {
      let ret = response.processed.receipt.status;
      assert.equal('executed', ret);
      done();
    }).catch(err => {
      console.log(err)
      assert.strictEqual(0, 1, 'Transaction was not successful');
      done();
    });
  });

  it('patreosnexus Registers Service with recurringpay', function(done) {
    let tx = transaction_builder.transfer('patreosnexus', 'recurringpay', '1.0000','regservice|Patreos','eosio.token', 'EOS');
    eos.transaction(tx).then((response) => {
      let ret = response.processed.receipt.status;
      assert.equal('executed', ret);
      done();
    }).catch(err => {
      console.log(err)
      assert.strictEqual(0, 1, 'Transaction was not successful');
      done();
    });
  });

  it('Register Tokens to patreosnexus Provider', function(done) {
    let tokens = [
      {
        "token_contract": "eosio.token",
        "flat_fee": "0.2000 EOS",
        "percentage_fee": 1.3
      },
      {
        "token_contract": "patreostoken",
        "flat_fee": "1.0000 PATR",
        "percentage_fee": 1.2
      }
    ];
    let tx = transaction_builder.addtokens('patreosnexus', tokens);
    eos.transaction(tx).then((response) => {
      let ret = response.processed.receipt.status;
      assert.equal('executed', ret);
      done();
    }).catch(err => {
      console.log(err)
      assert.strictEqual(0, 1, 'Transaction was not successful');
      done();
    });
  });

  it('Create Unique Subscription Agreement Using patreosnexus Provider', function(done) {
    let agreement = transaction_builder._build_agreement(
      'testplanet1x', 'testplanet2x', '2.0000 PATR', 'patreostoken', 15
    );
    let tx = transaction_builder.subscribe('patreosnexus', agreement);
    eos.transaction(tx).then((response) => {
      let ret = response.processed.receipt.status;
      assert.equal('executed', ret);
      done();
    }).catch(err => {
      console.log(err);
      assert.strictEqual(0, 1, 'Transaction was not successful');
      done();
    });
  });

  it('Verify Subscription Agreement Was Processed Once', function(done) {
    const from = 'testplanet1x';
    const to = 'testplanet2x';

    const encodedName = Eos.modules.format.encodeName(from, false);
    // const lowerBound = combineIds('testplanet1x', 'testplanet2x')
    const lowerBound = bignum(encodedName, 10);
    eos.getTableRows({
      "json": true,
      "scope": 'patreosnexus',
      "code": config.code.recurringpay,
      "table": "agreements",
      "index_position": 3,
      "table_key": 'from',
      "key_type": 'i64',
      "lower_bound": lowerBound.toString(),
      "limit": 1
    }).then(result => {
      target = undefined;
      for(var r of result.rows) {
        if(r.from == from && r.to == to) {
          target = r;
        }
      }
      if(target == undefined) {
        assert.strictEqual(0, 1, 'Subscription Not Verified');
        done();
      }
      assert.strictEqual(target.pending_payments, 0, 'Subscription Has No Pending Payments');
      assert.strictEqual(target.execution_count, 1, 'Subscription Was Executed Once');
      done();
    }).catch((error) =>{
      console.log(error);
      assert.strictEqual(0, 1, 'Subscription Not Verified');
      done();
    });
  });

  it('Subscription Agreement Not Yet Due', function(done) {
    let tx = transaction_builder.process('patreosnexus', 'testplanet1x', 'testplanet2x');
    eos.transaction(tx).then((response) => {
      console.log(response);
      assert.strictEqual(0, 1, 'Transaction was successful');
      done();
    }).catch(err => {
      error = JSON.parse(err).error;
      let message = error.details[0].message;
      assert.ok(message.includes("Subscription is not due"));
      done();
    });
  });

  it('Process Due Subscription Agreement Using patreosnexus Provider', function(done) {
    this.timeout(20000);
    let tx = transaction_builder.process('patreosnexus', 'testplanet1x', 'testplanet2x');
    new Promise(resolve => setTimeout(() => {
      eos.transaction(tx).then((response) => {
        let ret = response.processed.receipt.status;
        assert.equal('executed', ret);
        done();
      }).catch(err => {
        console.log(err);
        assert.strictEqual(0, 1, 'Transaction was not successful');
        done();
      });
    }, 15000));
  });

  it('Verify Subscription Agreement Was Processed Twice And Not Due', function(done) {
    const from = 'testplanet1x';
    const to = 'testplanet2x';

    const encodedName = Eos.modules.format.encodeName(from, false);
    // const lowerBound = combineIds('testplanet1x', 'testplanet2x')
    const lowerBound = bignum(encodedName, 10);
    eos.getTableRows({
      "json": true,
      "scope": 'patreosnexus',
      "code": config.code.recurringpay,
      "table": "agreements",
      "index_position": 3,
      "table_key": 'from',
      "key_type": 'i64',
      "lower_bound": lowerBound.toString(),
      "limit": 1
    }).then(result => {
      target = undefined;
      for(var r of result.rows) {
        if(r.from == from && r.to == to) {
          target = r;
        }
      }
      if(target == undefined) {
        assert.strictEqual(0, 1, 'Subscription Not Verified');
        done();
      }
      assert.strictEqual(target.pending_payments, 0, 'Subscription Has No Pending Payments');
      assert.strictEqual(target.execution_count, 2, 'Subscription Was Executed Once');
      done();
    }).catch((error) =>{
      console.log(error);
      assert.strictEqual(0, 1, 'Subscription Not Verified');
      done();
    });
  });

  it('Remove Subscription Agreement Using patreosnexus Provider', function(done) {
    let tx = transaction_builder.unsubscribe('patreosnexus', 'testplanet1x', 'testplanet2x');
    eos.transaction(tx).then((response) => {
      let ret = response.processed.receipt.status;
      assert.equal('executed', ret);
      done();
    }).catch(err => {
      console.log(err);
      assert.strictEqual(0, 1, 'Transaction was not successful');
      done();
    });
  });

  it('testplanet2x Withdraw PATR', function(done) {
    let tx = transaction_builder.withdraw('testplanet2x', 'patreostoken', '0.5000 PATR');
    eos.transaction(tx).then((response) => {
      let ret = response.processed.receipt.status;
      assert.equal('executed', ret);
      done();
    }).catch(err => {
      console.log(err);
      assert.strictEqual(0, 1, 'Transaction was not successful');
      done();
    });
  });

  it('testplanet2x Cannot Withdraw FAKE', function(done) {
    let tx = transaction_builder.withdraw('testplanet2x', 'patreostoken', '0.5000 FAKE');
    eos.transaction(tx).then((response) => {
      console.log(response);
      assert.strictEqual(0, 1, 'Transaction was successful');
      done();
    }).catch(err => {
      error = JSON.parse(err).error;
      let message = error.details[0].message;
      assert.ok(message.includes("No balance found"));
      done();
    });
  });

  it('testplanet2x Cannot Withdraw PATR from fake contract', function(done) {
    let tx = transaction_builder.withdraw('testplanet2x', 'patreosfaker', '0.5000 PATR');
    eos.transaction(tx).then((response) => {
      console.log(response);
      assert.strictEqual(0, 1, 'Transaction was successful');
      done();
    }).catch(err => {
      error = JSON.parse(err).error;
      let message = error.details[0].message;
      assert.ok(message.includes("No balance found"));
      done();
    });
  });

  it('testplanet2x Cannot Overdraw PATR balance', function(done) {
    let tx = transaction_builder.withdraw('testplanet2x', 'patreostoken', '999999.0000 PATR');
    eos.transaction(tx).then((response) => {
      console.log(response);
      assert.strictEqual(0, 1, 'Transaction was successful');
      done();
    }).catch(err => {
      error = JSON.parse(err).error;
      let message = error.details[0].message;
      assert.ok(message.includes("overdrawn balance"));
      done();
    });
  });

  it('patreosnexus Unregisters Service with recurringpay', function(done) {
    let tx = transaction_builder.unregservice('patreosnexus');
    eos.transaction(tx).then((response) => {
      let ret = response.processed.receipt.status;
      assert.equal('executed', ret);
      done();
    }).catch(err => {
      console.log(err)
      assert.strictEqual(0, 1, 'Transaction was not successful');
      done();
    });
  });

});
