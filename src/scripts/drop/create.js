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

var config = configModule.config.development;
config.eos.keyProvider = [
  accounts.contracts[0].private_key, //patreostoken
  accounts.contracts[1].private_key, //patreosnexus
  accounts.users[0].private_key, //xokayplanetx
];

const transaction_builder = new TransactionBuilder(config);

eos = Eos(config.eos);

// Create accounts

const execSync = require('child_process').execSync;

async function createDropAccounts(dropResultsJson) {
  for (drop of dropResultsJson) {
    console.log(util.format('Creating %s', drop.account))
    await createAccount(drop.account, 'EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV')
  }
}

async function createAccount(account, key) {
  cmd = util.format('cleos system newaccount --stake-net "100.0000 SYS" --stake-cpu "100.0000 SYS" --buy-ram-kbytes 1000 eosio %s %s %s', account, key, key)
  console.log(cmd)
  try {
      let out = execSync(cmd).toString();
      console.log(out);
  } catch(err) {
      console.error(err);
  }
}

csv({
  noheader: true,
  headers: ['account', 'PATR']
})
.fromString(dropResults.toString('utf8'))
.then( (jsonObj) => {
  createDropAccounts(jsonObj)
})
