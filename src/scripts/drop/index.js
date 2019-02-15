Eos = require('eosjs')
const csv = require('csvtojson');
const fs = require("fs");
const assert = require('assert');
const accounts = JSON.parse(fs.readFileSync("accounts.json"));
const dropResults = fs.readFileSync("airdrop_results_2018-10-01-sorted.txt");
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

var config = configModule.config.production;
config.eos.keyProvider = [
  accounts.users[9].private_key, //patreosvault
];

const transaction_builder = new TransactionBuilder(config);

eos = Eos(config.eos);

let dropped = 0;
let skipUntil = 0;
let stopAt = 0;

function buildIssuePatr(to, quantity, memo) {
  return {
    actions: [{
      account: 'patreostoken',
      name: 'issue',
      authorization: [{
        actor: 'patreosvault',
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

let sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function handleDrops(dropResultsJson) {
  for (drop of dropResultsJson) {
    dropped++
    if(skipUntil > 0 && dropped < skipUntil) {
      continue;
    }
    if(stopAt > 0 && dropped >= stopAt) {
      continue;
    }

    await issuePatr(drop.account, drop.PATR)
    await sleep(100)
  }
}

async function issuePatr(account, patr) {
  await eos.transaction(buildIssuePatr(account, patr, 'Stake PATR at patreos.com to earn rewards.  Welcome to the content revolution!')).then((response) => {
    let ret = response.processed.receipt.status;
    if(ret == 'executed') {
      console.log(util.format('%s) Dropped %s PATR to %s', dropped, patr, account))
    } else {
      console.log(util.format('%s) Failed at dropping %s PATR to %s', dropped, patr, account))
      process.exit(400);
    }
  }).catch(err => {
    console.log(util.format('%s) Failed at dropping %s PATR to %s', dropped, patr, account));
    console.log(err);
    process.exit(500); // out of ram, cpu, bandwidth, etc.
  });
}
