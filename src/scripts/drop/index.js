Eos = require('eosjs')
const csv = require('csvtojson');
const fs = require("fs");
const assert = require('assert');
const accounts = JSON.parse(fs.readFileSync("accounts.json"));
const dropResults = fs.readFileSync("airdrop_results_test.txt");
const configModule = require("../../config/test_config.js");
const util = require('util');
const TransactionBuilder = require('../../utils/transaction_builder');


process.on('unhandledRejection', (reason, promise) => {
  //console.log('Unhandled Rejection at:', reason.stack || reason)
  // Recommended: send the information to sentry.io
  // or whatever crash reporting service you use
})

process.on('exit', function(code) {
    return console.log(`Exiting with code ${code}`);
});

var config = configModule.config.development;
config.eos.keyProvider = [
  accounts.contracts[0].private_key, //patreostoken
  accounts.contracts[1].private_key, //patreosnexus
  accounts.users[0].private_key, //xokayplanetx
];

const transaction_builder = new TransactionBuilder(config);

eos = Eos(config.eos);

let dropped = 0;

function buildIssuePatr(to, quantity, memo) {
  return {
    actions: [{
      account: 'patreostoken',
      name: 'issue',
      authorization: [{
        actor: 'xokayplanetx',
        permission: 'active'
      }],
      data: {
        to: to,
        quantity: quantity + ' PATR',
        memo: memo
      }
    }]
  }
}

csv({
  noheader: true,
  headers: ['account', 'PATR']
})
.fromString(dropResults.toString('utf8'))
.then( (jsonObj) => {
  handleDrops(jsonObj)
})

async function handleDrops(dropResultsJson) {
  for (drop of dropResultsJson) {
    await issuePatr(drop.account, drop.PATR)
  }
}

async function issuePatr(account, patr) {
  await eos.transaction(buildIssuePatr(account, patr, 'Stake PATR at patreos.com.  Welcome to the content revolution!')).then((response) => {
    let ret = response.processed.receipt.status;
    if(ret == 'executed') {
      console.log(util.format('%s) Dropped %s PATR to %s', ++dropped, patr, account))
    } else {
      console.log(util.format('Failed at dropping %s PATR to %s', patr, account))
      process.exit(400);
    }
  }).catch(err => {
    console.log(util.format('Failed at dropping %s PATR to %s', patr, account));
    console.log(err);
    process.exit(500); // out of ram, cpu, bandwidth, etc.
  });
}
