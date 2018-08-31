import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AccountInfo from './components/accountInfo';
import * as ACCOUNT_ACTIONS from './actions/account_actions';
import './styles/index.scss';
import Eos from 'eosjs';
import config from 'react-global-configuration';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.config = config.get(process.env['ENV_VAR']); //eslint-disable-line
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

  createTransaction = () => {
    const network = this.config.requiredFields.accounts[0];
    const eos = this.scatter.eos( network, Eos, {} );
    eos.transaction(
      {
        actions: [
          {
            account: 'eosio.token',
            name: 'transfer',
            authorization: [{
              actor: 'okokokokokok',
              permission: 'active'
            }],
            data: {
              from: 'okokokokokok',
              to: 'eoscafekorea',
              quantity: '0.0001 EOS',
              memo: ''
            }
          }
        ]
      }
      // config -- example: {broadcast: false, sign: true}
    )
  }

  getEosAccountInfo = () => {
    const eos = Eos({...this.config.eos});
    const account = eos.getAccount(this.props.accountInfo.userName);
    account.then((response) => {
      this.props.accountActions.updateUserInfo(response);
    }).catch(error => {
      console.log('An error occurred: ' + JSON.stringify(error)); //eslint-disable-line
    });
  };

  render() {
    return (
      <div className='wrapper'>
        <AccountInfo/>
        <button onClick={() => this.getEosAccountInfo()}>get user info</button>
        <button onClick={() => this.createTransaction()}>send transaction</button>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    accountActions: bindActionCreators(ACCOUNT_ACTIONS, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    accountInfo: state.accountInfo
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
