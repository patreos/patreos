import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AccountInfo from './components/accountInfo';
import PatreosInfo from './components/patreosInfo';
import RecurringPayInfo from './components/recurringpayInfo';
import Sidebar from './components/sidebar';
import Menu from './components/menu';
import * as ACCOUNT_ACTIONS from './actions/account_actions';
import * as PATREOS_ACTIONS from './actions/patreos_actions';
import * as RECURRINGPAY_ACTIONS from './actions/recurringpay_actions';
import './styles/custom.css';
import './styles/index.scss';
import Eos from 'eosjs';
import config from 'react-global-configuration';
import TransactionBuilder from './utils/transaction_builder'
import EosReader from './utils/eos_reader'
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
        <Sidebar/>
        <div id="content">
          <Menu/>
          <AccountInfo eos={this.eos} scatterEos={ this.scatterEos } eosBalanceAmt={ this.props.accountReducer.eosBalanceAmt } patrBalanceAmt={ this.props.patreosReducer.balanceAmt } recurringpayBalancesArr={ this.props.recurringpayReducer.balancesArr }/>
          <PatreosInfo eos={this.eos} scatterEos={ this.scatterEos } config={ this.config } eosAccountStr={ this.props.accountReducer.eosAccountStr } patrBalanceAmt={ this.props.patreosReducer.balanceAmt } recurringpayBalancesArr={ this.props.recurringpayReducer.balancesArr }/>
          <RecurringPayInfo eos={this.eos} scatterEos={ this.scatterEos } config={ this.config } eosAccountStr={ this.props.accountReducer.eosAccountStr } patrBalanceAmt={ this.props.patreosReducer.balanceAmt } recurringpayBalancesArr={ this.props.recurringpayReducer.balancesArr }/>
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
      this.config.code.recurringpay,
      this.props.accountReducer.eosAccountStr,
      'balances',
      (val) => this.props.recurringpayActions.updateBalancesArr(val)
    );
  };

}

function mapDispatchToProps(dispatch) {
  return {
    accountActions: bindActionCreators(ACCOUNT_ACTIONS, dispatch),
    patreosActions: bindActionCreators(PATREOS_ACTIONS, dispatch),
    recurringpayActions: bindActionCreators(RECURRINGPAY_ACTIONS, dispatch),
  };
}

function mapStateToProps(state) {
  return {
    accountReducer: state.accountReducer,
    patreosReducer: state.patreosReducer,
    recurringpayReducer: state.recurringpayReducer,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
