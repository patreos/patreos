const config = {
  development: {
    env: 'development',
    requiredFields: {
      accounts:[
        {
          protocol: 'http',
          blockchain: 'eos',
          chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
          host: '127.0.0.1',
          expireInSeconds: 3600,
          verbose: false,
          port: 8888
        }
      ]
    },
    eos: {
      httpEndpoint: 'http://127.0.0.1:8888',
      chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
      keyProvider: '5JXT8YAsNvtipDH6oFon75EdFLHZ1x8VmwgBz2kz3be7Jr3kW4S',
      verbose: false
    },
    code: {
      eosiotoken: 'eosio.token',
      patreostoken: 'patreostoken',
      patreosmoney: 'patreosmoney',
      recurringpay: 'recurringpay',
      patreosnexus: 'patreosnexus'
    },
    patreosSymbol: 'PATR',
    systemSymbol: 'EOS',
    updateInterval: 3000
  },
  testnet: {
    env: 'testnet',
    requiredFields: {
      accounts:[
        {
          protocol: 'https',
          blockchain: 'eos',
          chainId: 'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473',
          host: 'https://jungle2.cryptolions.io',
          expireInSeconds: 3600,
          verbose: false,
          port: 38888
        }
      ]
    },
    eos: {
      httpEndpoint: 'https://jungle2.cryptolions.io:443',
      chainId: 'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473',
      verbose: true
    },
    code: {
      eosiotoken: 'eosio.token',
      patreostoken: 'patreostoken',
      patreosmoney: '',
      recurringpay: 'recurringpay',
      patreosnexus: 'patreosnexus'
    },
    patreosSymbol: 'PATR',
    systemSymbol: 'EOS',
    updateInterval: 3000
  },
  production: {
    env: 'mainnet',
    requiredFields: {
      accounts:[
        {
          protocol: 'https',
          blockchain: 'eos',
          chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
          host: 'mainnet.eoscanada.com',
          port: 443
        }
      ]
    },
    eos: {
      httpEndpoint: 'https://mainnet.eoscanada.com',
      chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
      verbose: false
    },
    code: {
      eosiotoken: 'eosio.token',
      patreostoken: 'patreostoken',
      patreosmoney: 'patreosmoney',
      recurringpay: 'recurringpay',
      patreosnexus: 'patreosnexus'
    },
    patreosSymbol: 'PATR',
    systemSymbol: 'EOS',
    updateInterval: 2000
  }
};

export default config;
