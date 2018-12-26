Eos = require('eosjs')
var fs = require("fs");
var assert = require('assert');
var accounts = fs.readFileSync("accounts.json");
accounts = JSON.parse(accounts);
var messagesModule = require("./messages.js");
var configModule = require("../../config/test_config.js");
var bignum = require('bignum');

//Adding agreement with secondary key (from.to): 269426230777718110912747792682672604624
//Adding agreement with secondary key: (from): 14605625236689142736

var TransactionBuilder = require('../../utils/transaction_builder');

process.on('unhandledRejection', (reason, promise) => {
  //console.log('Unhandled Rejection at:', reason.stack || reason)
  // Recommended: send the information to sentry.io
  // or whatever crash reporting service you use
})

var config = configModule.config.development;
config.eos.keyProvider = [
  accounts.users[0].private_key, //xokayplanetx
  accounts.users[1].private_key, //testairdropx
  accounts.users[2].private_key, //testplanet1x
  accounts.users[3].private_key //testplanet2x
];
var messages = messagesModule.messages;

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
    let tx = transaction_builder.transfer('xokayplanetx', 'recurringpay', '15.0000','STAKE <3','patreostoken', 'PATR');
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
    let tx = transaction_builder.transfer('testplanet1x', 'recurringpay', '15.0000','STAKE <3','patreostoken', 'PATR');
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

  it('Register Service Provider', function(done) {
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
    let tx = transaction_builder.regservice('xokayplanetx', tokens);
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

  it('Create Unique Subscription Agreement Using xokayplanetx Provider', function(done) {
    let agreement = transaction_builder._build_agreement(
      'testplanet1x', 'testplanet2x', '2.0000 PATR', 'patreostoken', 1
    );
    let tx = transaction_builder.subscribe('xokayplanetx', agreement);
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

  it('Verify Subscription Agreement', function(done) {
    const from = 'testplanet1x';
    const to = 'testplanet2x';

    const encodedName = Eos.modules.format.encodeName(from, false);
    // const lowerBound = combineIds('testplanet1x', 'testplanet2x')
    const lowerBound = bignum(encodedName, 10);
    eos.getTableRows({
      "json": true,
      "scope": 'xokayplanetx',
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
      assert.strictEqual(target.cycle_seconds, 1, 'Subscription Verified');
      done();
    }).catch((error) =>{
      console.log(error);
      assert.strictEqual(0, 1, 'Subscription Not Verified');
      done();
    });
  });

  it('Cannot Process Subscription Agreement Using xokayplanetx Provider', function(done) {
    let tx = transaction_builder.process('xokayplanetx', 'testplanet1x', 'testplanet2x');
    new Promise(resolve => setTimeout(() => {
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
    }, 400));
  });

  it('Process Subscription Agreement Using xokayplanetx Provider', function(done) {
    let tx = transaction_builder.process('xokayplanetx', 'testplanet1x', 'testplanet2x');
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
    }, 1600));
  });

  it('Remove Subscription Agreement Using xokayplanetx Provider', function(done) {
    let tx = transaction_builder.unsubscribe('xokayplanetx', 'testplanet1x', 'testplanet2x');
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

});
