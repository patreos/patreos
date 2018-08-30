const config = {
  development: {
    env: 'development',
    testAccount: 'okokokokokok',
    requiredFields: {
      accounts:[
        {
          blockchain: 'eos',
          chainId: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca',
          host: 'http://jungle.cryptolions.io',
          port: 38888
        }
      ]
    },
    eos: {
      httpEndpoint: 'http://jungle.cryptolions.io:38888',
      chainId: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca',
      verbose: true
    },
  },
  production: {
    env: 'production',
    testAccount: 'okokokokokok',
    requiredFields: {
      accounts:[
        {blockchain: 'eos', host: 'https://mainnet.eoscanada.com', port: 443},
      ]
    },
    eos: {
      httpEndpoint: 'https://mainnet.eoscanada.com',
      chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
      verbose: true
    },
  }
};

export default config;
