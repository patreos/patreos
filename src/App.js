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
    this.config = config.get(process.env['ENV_VAR']); //eslint-disable-line
  }

  componentWillMount() {
    document.addEventListener('scatterLoaded', () => {
      this.scatter = window.scatter;
      window.scatter = null;
      this.props.uiActions.detectScatter('SCATTER DETECTED');
      this.getScatterIdentity();
    });
  }

  componentDidMount() {
    if (!this.scatter) {
      this.props.uiActions.detectScatter('SCATTER NOT DETECTED');
    }
  }

  componentWillUnmount() {
    document.removeEventListener('scatterLoaded', () => {}, false);
  }

  getScatterIdentity = () => {
    const required = this.config.requiredFields;
    this.scatter.getIdentity(required).then(identity => {
      this.props.uiActions.updateName(identity.accounts[0].name);
    }).catch(error => {
      console.log('An error occurred: ' + JSON.stringify(error)); //eslint-disable-line
    });
  };

  getEosAccountInfo = () => {
    const eos = Eos({...this.config.eos});
    const account = eos.getAccount(this.props.ui.userName);
    account.then((response) => {
      this.props.uiActions.updateUserInfo(response);
    }).catch(error => {
      console.log('An error occurred: ' + JSON.stringify(error)); //eslint-disable-line
    });
  };

  render() {
    return (
      <div className='wrapper'>
        <AccountInfo/>
        <button onClick={() => this.getEosAccountInfo()}>get user info</button>
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
