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
    });

    this.getAccountInfo();
  }

  getAccountInfo = () => {
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
