## Patreos Project

This project is the dapp UI for Patreos.  For more information about the technologies used, see links below:

- [Scatter Wallet](https://get-scatter.com/).
- [Scatter JS](https://github.com/GetScatter/scatter-js).
- [EOS JS](https://github.com/EOSIO/eosjs).
- [Jungle 2.0 Testnet](https://monitor.jungletestnet.io).
- [Jungle Testnet & Scatter](https://steemit.com/eos/@conceptskip/eos-wallet-testing-in-the-jungle-testnet).

Below is a list of relevant Patreos smart contracts:
 - patreostoken (token contract)
 - patreosblurb (alert manager)
 - recurringpay (subscription manager)
 - patreosmoney (inflation policy)

## We use the Jungle Testnet for end-to-end testing with Scatter

You can generate your public/private keys on Scatter, then register for an account [Jungle Testnet Account Creation](https://monitor.jungletestnet.io/#account).  You can get testnet tokens from the [Faucet](https://monitor.jungletestnet.io/#faucet).

The current testnet chain ID is: `e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473`
A valid endpoint is: `https://jungle2.cryptolions.io:443`, where further chain info can be found at `https://jungle2.cryptolions.io:443/v1/chain/get_info`

## Getting Started

#### Installing
```
npm install
```

#### Running
```
npm run dev
```

#### Additional
Ubuntu users may reach the kernel inotify watch limit.  If so, run:
```
sudo sysctl fs.inotify.max_user_watches=524288
```

## Contributing

Contributions are welcome from anyone.  There is currently not a contribution guide, so simply create a PR and await feedback.
