import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BrowserRouter, Route } from 'react-router-dom'
import Eos from 'eosjs';
import config from 'react-global-configuration';

import '../styles/custom.css';
import '../styles/index.scss';

import Menu from './menu';
import Sidebar from './sidebar';
import Home from './routes/home';
import Account from './routes/account';
import Pledge from './routes/pledge';
import Balance from './routes/balance';
import Billing from './routes/billing';

import * as ACCOUNT_ACTIONS from '../actions/account_actions';
import * as DEBUG_ACTIONS from '../actions/debug_actions';
import * as PATREOS_ACTIONS from '../actions/patreos_actions';
import * as RECURRINGPAY_ACTIONS from '../actions/recurringpay_actions';

import TransactionBuilder from '../utils/transaction_builder'
import EosReader from '../utils/eos_reader'
import ScatterJS from 'scatter-js/dist/scatter.esm';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.scatter;
    this.scatterEos;
    this.config = config.get(process.env['ENV_VAR']); //eslint-disable-line
    this.network = this.config.requiredFields.accounts[0];
    this.eos = Eos({...this.config.eos});
    this.transactionBuilder = new TransactionBuilder(this.config);
    this.eosReader = new EosReader(this.eos);
  }

  accountInfoUpdate() {
    if(this.scatter != null) {
      this.getEOSBalance();
      this.getPATRBalance();
      this.getRecurringPayBalances();
      this.getEosAccountInfo();
    }
  }

  componentWillMount() {
    ScatterJS.scatter.connect("patreos.com").then(connected => {
        if(!connected) {
            // User does not have Scatter Desktop or Classic installed.
            return false;
        }
        this.scatter = window.scatter;
        window.scatter = null;
        this.props.accountActions.updateScatterDetectionStr('SCATTER DETECTED');
        this.getScatterIdentity();
    });
  }

  componentDidMount() {
    if (!this.scatter) {
      this.props.accountActions.updateScatterDetectionStr('SCATTER NOT DETECTED');
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.accountReducer.eosBalanceAmt !== this.props.accountReducer.eosBalanceAmt) {
      //console.log("Updated App EOS Balance prop: " + this.props.accountReducer.eosBalanceAmt)
    }
    if (prevProps.patreosReducer.balanceAmt !== this.props.patreosReducer.balanceAmt) {
      //console.log("Updated App PATR Balance prop: " + this.props.patreosReducer.balanceAmt)
    }
  }

  componentWillUnmount() {
    document.removeEventListener('scatterLoaded', () => {}, false);
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className='wrapper'>
        <Sidebar config={ this.config } eos={this.eos} scatterEos={ this.scatterEos }/>
        <div id="content">
          <BrowserRouter>
            <div>
              <Menu config={ this.config } eos={this.eos} scatterEos={ this.scatterEos }/>
              <Route
                exact path='/'
                render={
                  (props) => <Home {...props} config={ this.config } eos={this.eos} scatterEos={ this.scatterEos } eosAccountStr={ this.props.accountReducer.eosAccountStr } eosBalanceAmt={ this.props.accountReducer.eosBalanceAmt } patrBalanceAmt={ this.props.patreosReducer.balanceAmt } recurringpayBalancesArr={ this.props.recurringpayReducer.balancesArr }/>
                }
              />
              <Route
                exact path='/account'
                render={
                  (props) => <Account {...props} config={ this.config } eos={this.eos} scatterEos={ this.scatterEos } eosAccountStr={ this.props.accountReducer.eosAccountStr } eosBalanceAmt={ this.props.accountReducer.eosBalanceAmt } patrBalanceAmt={ this.props.patreosReducer.balanceAmt } recurringpayBalancesArr={ this.props.recurringpayReducer.balancesArr }/>
                }
              />
              <Route
                exact path='/pledge'
                render={
                  (props) => <Pledge {...props} config={ this.config } eos={this.eos} scatterEos={ this.scatterEos } eosAccountStr={ this.props.accountReducer.eosAccountStr } eosBalanceAmt={ this.props.accountReducer.eosBalanceAmt } patrBalanceAmt={ this.props.patreosReducer.balanceAmt } recurringpayBalancesArr={ this.props.recurringpayReducer.balancesArr }/>
                }
              />
              <Route
                exact path='/balance'
                render={
                  (props) => <Balance {...props} config={ this.config } eos={this.eos} scatterEos={ this.scatterEos } eosAccountStr={ this.props.accountReducer.eosAccountStr } eosBalanceAmt={ this.props.accountReducer.eosBalanceAmt } patrBalanceAmt={ this.props.patreosReducer.balanceAmt } recurringpayBalancesArr={ this.props.recurringpayReducer.balancesArr }/>
                }
              />
              <Route
                exact path='/billing'
                render={
                  (props) => <Billing {...props} config={ this.config } eos={this.eos} scatterEos={ this.scatterEos } eosAccountStr={ this.props.accountReducer.eosAccountStr } eosBalanceAmt={ this.props.accountReducer.eosBalanceAmt } patrBalanceAmt={ this.props.patreosReducer.balanceAmt } recurringpayBalancesArr={ this.props.recurringpayReducer.balancesArr }/>
                }
              />
            </div>
          </BrowserRouter>
        </div>
      </div>
    );
  }

  getScatterIdentity = () => {
    const required = this.config.requiredFields;
    this.scatter.getIdentity(required).then(identity => {
      this.props.accountActions.updateEosAccountStr(identity.accounts[0].name);

      // We now have an account name.  Get info
      this.scatterEos = this.scatter.eos(this.network, Eos, {});
      this.accountInfoUpdate();
      this.interval = setInterval(() => this.accountInfoUpdate(), this.config.updateInterval);
    }).catch(error => {
      console.log('An error occurred: ' + JSON.stringify(error)); //eslint-disable-line
    });
  };

  getEosAccountInfo = () => {
    this.eosReader.getAccount(
      this.props.accountReducer.eosAccountStr,
      (val) => this.props.accountActions.updateEosAccountInfoObj(val)
    );
  };

  getEOSBalance = () => {
    this.eosReader.getBalance(
      this.config.code.eosiotoken,
      this.props.accountReducer.eosAccountStr,
      this.config.systemSymbol,
      (val) => this.props.accountActions.updateEosBalanceAmt(val)
    );
  };

  getPATRBalance = () => {
    this.eosReader.getBalance(
      this.config.code.patreostoken,
      this.props.accountReducer.eosAccountStr,
      this.config.patreosSymbol,
      (val) => this.props.patreosActions.updateBalanceAmt(val)
    );
  };

  getRecurringPayBalances = () => {
    this.eosReader.getTable(
      {
        "json": true,
        "scope": this.props.accountReducer.eosAccountStr,
        "code": this.config.code.recurringpay,
        "table": 'balances',
        "limit": 10
      },
      (val) => this.props.recurringpayActions.updateBalancesArr(val)
    );
  };

}

function mapDispatchToProps(dispatch) {
  return {
    accountActions: bindActionCreators(ACCOUNT_ACTIONS, dispatch),
    debugActions: bindActionCreators(DEBUG_ACTIONS, dispatch),
    patreosActions: bindActionCreators(PATREOS_ACTIONS, dispatch),
    recurringpayActions: bindActionCreators(RECURRINGPAY_ACTIONS, dispatch),
  };
}

function mapStateToProps(state) {
  return {
    accountReducer: state.accountReducer,
    debugReducer: state.debugReducer,
    patreosReducer: state.patreosReducer,
    recurringpayReducer: state.recurringpayReducer,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
