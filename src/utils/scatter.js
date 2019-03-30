import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';
import Eos from 'eosjs';

ScatterJS.plugins( new ScatterEOS() );

class ScatterHelper {

  constructor(props) {
    this.props = props;
    this.config = this.props.config;
    this.network = this.config.requiredFields.accounts[0];
    this.eos = Eos({...this.config.eos});
  }

  recoverScatter = (callback) => {
    const network = ScatterJS.Network.fromJson(this.network);
    ScatterJS.connect('patreos.com', {network}).then(connected => {
      if (this.props.accountReducer.scatterDetectionStr == '' && ScatterJS.identity) {
        if(!connected) {
          this.props.accountActions.updateScatterDetectionStr('false');
          return
        }

        const scatterEos = ScatterJS.eos(this.network, Eos);
        this.props.accountActions.updateScatterEosObj(scatterEos)

        this.loginScatter(callback);
      }
    });
  };

  loginScatter = (callback) => {
    ScatterJS.login().then(id => {
        if(!id) {
          this.props.accountActions.updateScatterDetectionStr('false');
          return
        }
        const account = ScatterJS.account('eos');
        this.props.accountActions.updateEosAccountStr(account.name);
        this.props.accountActions.updateEosAccountAuthorityStr(account.authority);
        this.props.accountActions.updateScatterDetectionStr('true');
        if(callback) {
          callback()
        }
    });
  };

  connectScatter = (callback) => {
    const network = ScatterJS.Network.fromJson(this.network);

    ScatterJS.connect('patreos.com', {network}).then(connected => {
        if(!connected) {
          this.props.accountActions.updateScatterDetectionStr('false');
          return
        }

        const scatterEos = ScatterJS.eos(this.network, Eos);
        this.props.accountActions.updateScatterEosObj(scatterEos)

        this.loginScatter(callback);
    });
  };

  disconnectScatter = () => {
    ScatterJS.logout().then(id => {
      if(this.props.hasOwnProperty('accountActions')) {
        this.props.accountActions.updateEosAccountStr('Loading...');
        this.props.accountActions.updateEosAccountAuthorityStr('');
        this.props.accountActions.updateEosAccountInfoObj('');
        this.props.accountActions.updateEosBalanceAmt('0.0000 EOS');
        this.props.accountActions.updateScatterDetectionStr('false');
      }
      if(this.props.hasOwnProperty('patreosActions')) {
        this.props.patreosActions.updateBalanceAmt('0.0000 PATR');
      }
    });
  };

  getScatterIdentity = () => {
    return ScatterJS.identity;
  }

}

module.exports = ScatterHelper
