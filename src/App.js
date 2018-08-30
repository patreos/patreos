import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AccountInfo from './components/accountInfo';
import * as UI_ACTIONS from './actions/ui_actions';
import './styles/index.scss';
import Eos from 'eosjs';
import config from 'react-global-configuration';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.appConfig = config.get(process.env['ENV_VAR']); //eslint-disable-line
  }

  componentDidMount() {
    document.addEventListener('scatterLoaded', () => {
      this.scatter = window.scatter;
      window.scatter = null;
      this.props.uiActions.detectScatter('SCATTER DETECTED');
      this.getAccountInfo();
    });
  }

  getAccountInfo = () => {
    this.scatter.getIdentity().then(identity => {
      this.props.uiActions.updateName(identity.name);
      this.props.uiActions.updateUserInfo(identity);
    }).catch(error => {
      console.log('An error occurred: ' + error); //eslint-disable-line
    });
  };

  getTransactions = () => {
    //These lines are for hitting the blockchain and getting info via eosjs
    const eos = Eos(Object.assign({}, this.appConfig.eos));
    const account = eos.getAccount(this.appConfig.testAccount);
    account.then((response) => {
      this.props.uiActions.updateUserInfo(response);
    });
  };

  render() {
    return (
      <div className='wrapper'>
        <AccountInfo/>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    uiActions: bindActionCreators(UI_ACTIONS, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    ui: state.ui
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
