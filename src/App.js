import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Header from './components/header';
import AccountInfo from './components/accountInfo';
import TokenInfo from './components/tokenInfo';
import Footer from './components/footer';
import Demo from './components/demo';
import * as ACCOUNT_ACTIONS from './actions/account_actions';
import * as PATREOS_TOKEN_ACTIONS from './actions/token_actions';
import './styles/index.scss';
import Eos from 'eosjs';
import config from 'react-global-configuration';
import TransactionBuilder from './utils/transaction_builder'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.config = config.get(process.env['ENV_VAR']); //eslint-disable-line
    this.transaction_builder = new TransactionBuilder(this.config);
  }

  componentWillMount() {
    document.addEventListener('scatterLoaded', () => {
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

  componentWillUnmount() {
    document.removeEventListener('scatterLoaded', () => {}, false);
  }

  getScatterIdentity = () => {
    const required = this.config.requiredFields;
    this.scatter.getIdentity(required).then(identity => {
      this.props.accountActions.updateName(identity.accounts[0].name);
    }).catch(error => {
      console.log('An error occurred: ' + JSON.stringify(error)); //eslint-disable-line
    });
  };

  getEosAccountInfo = () => {
    const eos = Eos({...this.config.eos});
    const account = eos.getAccount(this.props.accountInfo.userName);
    account.then((response) => {
      this.props.accountActions.updateUserInfo(response[0]);
    }).catch(error => {
      console.log('An error occurred: ' + JSON.stringify(error)); //eslint-disable-line
    });
  };

  createBlurb = () => {
    const network = this.config.requiredFields.accounts[0];
    const eos = this.scatter.eos(network, Eos, {});
    const username = this.props.accountInfo.userName;
    const transaction = this.transaction_builder.blurb(username, 'eoscafekorea', '<3');
    eos.transaction(transaction);
  };

  render() {
    return (
        <Demo/>
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
