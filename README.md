## About Patreos Web

Patreos Web serves as both the landing page, and the dapp UI for the Patreos project.  For more information about the technologies used, see links below:

- [Scatter Wallet](https://get-scatter.com/).
- [Scatter JS](https://github.com/GetScatter/scatter-js).
- [EOS JS](https://github.com/EOSIO/eosjs).
- [Jungle Testnet](http://dev.cryptolions.io/).
- [Jungle Testnet & Scatter](https://steemit.com/eos/@conceptskip/eos-wallet-testing-in-the-jungle-testnet).

## We use the Jungle Testnet for end-to-end testing with Scatter

The current chain ID is: `038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca`
A valid endpoint is: `http://jungle.cryptolions.io:38888`, where further chain info can be found at `http://jungle.cryptolions.io:38888/v1/chain/get_info`

You can generate your public/private keys on Scatter, then register for an account [Jungle Testnet Account Creation](http://jungle.cryptolions.io/#account).

## Contributing

Contributions are welcome from anyone.  There is currently not a contribution guide, so simply create a PR and await feedback.

#Install dependencies
```npm install```

#Run dev
```npm run start```


Ubuntu users may reache the kernel inotify watch limit.  If so, run:
```
sudo sysctl fs.inotify.max_user_watches=524288
```
