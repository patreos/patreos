import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AccountInfo from './components/accountInfo';
import TokenInfo from './components/tokenInfo';
import Sidebar from './components/sidebar';
import Menu from './components/menu';
import * as ACCOUNT_ACTIONS from './actions/account_actions';
import * as PATREOS_TOKEN_ACTIONS from './actions/token_actions';
import './styles/custom.css';
import './styles/index.scss';
import Eos from 'eosjs';
import config from 'react-global-configuration';
import TransactionBuilder from './utils/transaction_builder'
import ScatterJS from 'scatter-js/dist/scatter.esm';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.scatter;
    this.scatterEos;
    this.config = config.get(process.env['ENV_VAR']); //eslint-disable-line
    this.network = this.config.requiredFields.accounts[0];
    this.eos = Eos({...this.config.eos});
    this.transaction_builder = new TransactionBuilder(this.config);
  }

  accountInfoUpdate() {
    if(this.scatter != null) {
      this.getEOSBalance();
      this.getPTRBalance();
      this.getVaultBalance();
    }
  }

  componentWillMount() {
    ScatterJS.scatter.connect("www.patreos.com").then(connected => {
        if(!connected) {
            // User does not have Scatter Desktop or Classic installed.
            return false;
        }
        this.scatter = window.scatter;
        window.scatter = null;
        this.props.accountActions.detectScatter('SCATTER DETECTED');
        this.getScatterIdentity();
    });
  }

  componentDidMount() {
    if (!this.scatter) {
      this.props.accountActions.detectScatter('SCATTER NOT DETECTED');
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.accountInfo.eosBalance !== this.props.accountInfo.eosBalance) {
      //console.log("Updated App EOS Balance prop: " + this.props.accountInfo.eosBalance)
    }
    if (prevProps.accountInfo.patrBalance !== this.props.accountInfo.patrBalance) {
      //console.log("Updated App PATR Balance prop: " + this.props.accountInfo.patrBalance)
    }
  }

  componentWillUnmount() {
    document.removeEventListener('scatterLoaded', () => {}, false);
    clearInterval(this.interval);
  }

  getScatterIdentity = () => {
    const required = this.config.requiredFields;
    this.scatter.getIdentity(required).then(identity => {
      this.props.accountActions.updateName(identity.accounts[0].name);

      // We now have an account name.  Get info
      this.scatterEos = this.scatter.eos(this.network, Eos, {});
      this.accountInfoUpdate();
      this.interval = setInterval(() => this.accountInfoUpdate(), this.config.updateInterval);
    }).catch(error => {
      console.log('An error occurred: ' + JSON.stringify(error)); //eslint-disable-line
    });
  };

  getEosAccountInfo = () => {
    const account = this.eos.getAccount(this.props.accountInfo.userName);
    account.then((response) => {
      //console.log(response);
      //this.props.accountActions.updateUserInfo(response[0]);
    }).catch(error => {
      console.log('An error occurred: ' + JSON.stringify(error)); //eslint-disable-line
    });
  };

  getEOSBalance = () => {
    const eosBalance = this.eos.getCurrencyBalance(this.config.code.eosiotoken,
      this.props.accountInfo.userName, this.config.systemSymbol)
    eosBalance.then((response) => {
      this.props.accountActions.updateEosBalance(response[0]);
    }).catch(error => {
      console.log('An error occurred: ' + JSON.stringify(error)); //eslint-disable-line
    });
  };

  getPTRBalance = () => {
    const patreosBalance = this.eos.getCurrencyBalance(this.config.code.patreostoken,
      this.props.accountInfo.userName, this.config.patreosSymbol)
    patreosBalance.then((response) => {
      this.props.accountActions.updatePatrBalance(response[0]);
    }).catch(error => {
      console.log('An error occurred: ' + JSON.stringify(error)); //eslint-disable-line
    });
  };

  getVaultBalance = () => {
    const vaultBalance = this.eos.getCurrencyBalance(this.config.code.patreosvault,
      this.props.accountInfo.userName)
    vaultBalance.then((response) => {
      this.props.accountActions.updateVaultInfo(response);
    }).catch(error => {
      console.log('An error occurred: ' + JSON.stringify(error)); //eslint-disable-line
    });
  };

  render() {
    return (
      <div className='wrapper'>
        <Sidebar/>
        <div id="content">
          <Menu/>
          <AccountInfo eos={this.eos} scatterEos={ this.scatterEos } eosBalance={ this.props.accountInfo.eosBalance } patrBalance={ this.props.accountInfo.patrBalance } vaultInfo={ this.props.accountInfo.vaultInfo }/>
          <TokenInfo eos={this.eos} scatterEos={ this.scatterEos } config={ this.config } account={ this.props.accountInfo.userName } patrBalance={ this.props.accountInfo.patrBalance }/>
        </div>
      </div>
    );
  }

}

function mapDispatchToProps(dispatch) {
  return {
    accountActions: bindActionCreators(ACCOUNT_ACTIONS, dispatch),
    tokenActions: bindActionCreators(PATREOS_TOKEN_ACTIONS, dispatch),
  };
}

function mapStateToProps(state) {
  return {
    accountInfo: state.accountInfo,
    tokenInfo: state.tokenInfo
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
