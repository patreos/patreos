const config = {
  development: {
    env: 'development',
    requiredFields: {
      accounts:[
        {
          protocol: 'http',
          blockchain: 'eos',
          chainId: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca',
          host: 'jungle.cryptolions.io',
          port: 38888
        }
      ]
    },
    eos: {
      httpEndpoint: 'http://jungle.cryptolions.io:38888',
      chainId: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca',
      verbose: true
    },
    code: {
      patreostoken: 'patreostoken',
      patreosblurb: 'patreostests',
      patreosmoney: 'patreostests',
      patreosnexus: 'patreostests'
    },
    patreosSymbol: 'PTR'
  },
  production: {
    env: 'production',
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
      patreostoken: 'patreostoken',
      patreosblurb: 'patreosblurb',
      patreosmoney: 'patreosmoney',
      patreosnexus: 'patreosnexus'
    },
    patreosSymbol: 'PTR'
  }
};

export default config;
