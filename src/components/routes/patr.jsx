import React from 'react';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';

import * as ACCOUNT_ACTIONS from '../../actions/account_actions';
import * as DEBUG_ACTIONS from '../../actions/debug_actions';
import * as PATREOS_ACTIONS from '../../actions/patreos_actions';

import TransactionBuilder from '../../utils/transaction_builder'
import EosReader from '../../utils/eos_reader'

import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';
import Eos from 'eosjs';

ScatterJS.plugins( new ScatterEOS() );

import PatreosStake from './elements/patreosStake';

class ManagePatr extends React.Component {

  constructor(props) {
    super(props);
    this.scatter;
    this.scatterEos;
    this.network = this.props.config.requiredFields.accounts[0];
    this.eos = Eos({...this.props.config.eos});
    this.transactionBuilder = new TransactionBuilder(this.props.config);
    this.eosReader = new EosReader(this.eos);
  }

  accountInfoUpdate() {
    if(Object.keys(this.props.accountReducer.scatterEosObj).length > 0) {
      this.getEOSBalance();
      this.getPATRBalance();
      this.getEosAccountInfo();
    }
  }

  componentWillMount() {
    this.props.accountActions.updateEosAccountStr('Loading...');
    this.props.accountActions.updateEosBalanceAmt('0.0000 EOS')
    this.props.patreosActions.updateBalanceAmt('0.0000 PATR')

    this.recoverScatter();
  }

  componentDidMount() {

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
    clearInterval(this.interval);
  }

  render() {
    return (
      <PatreosStake connectScatter={this.connectScatter} disconnectScatter={this.disconnectScatter} eos={this.eos} scatterEos={ this.props.accountReducer.scatterEosObj } scatterDetectionStr={ this.props.accountReducer.scatterDetectionStr } config={ this.props.config } eosAccountStr={ this.props.accountReducer.eosAccountStr } eosBalanceAmt={ this.props.accountReducer.eosBalanceAmt } patrBalanceAmt={ this.props.patreosReducer.balanceAmt } />
    );
  }

  recoverScatter = () => {
    const network = ScatterJS.Network.fromJson(this.network);
    ScatterJS.connect('patreos.com', {network}).then(connected => {
      if (this.props.accountReducer.scatterDetectionStr == '' && ScatterJS.identity) {
        this.connectScatter();
      }
    });
  }

  connectScatter = () => {
    const network = ScatterJS.Network.fromJson(this.network);

    ScatterJS.connect('patreos.com', {network}).then(connected => {
        if(!connected) {
          this.props.accountActions.updateScatterDetectionStr('false');
          return
        }

        const scatterEos = ScatterJS.eos(this.network, Eos);
        this.props.accountActions.updateScatterEosObj(scatterEos)

        ScatterJS.login().then(id => {
            if(!id) {
              this.props.accountActions.updateScatterDetectionStr('false');
              return
            }
            const account = ScatterJS.account('eos');
            this.props.accountActions.updateEosAccountStr(account.name);
            this.props.accountActions.updateEosAccountAuthorityStr(account.authority);
            this.props.accountActions.updateScatterDetectionStr('true');
            this.accountInfoUpdate();
            this.interval = setInterval(() => this.accountInfoUpdate(), this.props.config.updateInterval);
        });
    });
  }

  disconnectScatter = () => {
    ScatterJS.logout().then(id => {
        this.props.accountActions.updateEosAccountStr('Loading...');
        this.props.accountActions.updateEosAccountAuthorityStr('');
        this.props.accountActions.updateEosAccountInfoObj('')
        this.props.accountActions.updateEosBalanceAmt('0.0000 EOS')
        this.props.patreosActions.updateBalanceAmt('0.0000 PATR')
        this.props.accountActions.updateScatterDetectionStr('false');
        clearInterval(this.interval);
    });
  }

  getEosAccountInfo = () => {
    this.eosReader.getAccount(
      this.props.accountReducer.eosAccountStr,
      (val) => this.props.accountActions.updateEosAccountInfoObj(val)
    );
  };

  getEOSBalance = () => {
    this.eosReader.getBalance(
      this.props.config.code.eosiotoken,
      this.props.accountReducer.eosAccountStr,
      this.props.config.systemSymbol,
      (val) => this.props.accountActions.updateEosBalanceAmt(val)
    );
  };

  getPATRBalance = () => {
    this.eosReader.getBalance(
      this.props.config.code.patreostoken,
      this.props.accountReducer.eosAccountStr,
      this.props.config.patreosSymbol,
      (val) => this.props.patreosActions.updateBalanceAmt(val)
    );
  };

}

function mapDispatchToProps(dispatch) {
  return {
    accountActions: bindActionCreators(ACCOUNT_ACTIONS, dispatch),
    debugActions: bindActionCreators(DEBUG_ACTIONS, dispatch),
    patreosActions: bindActionCreators(PATREOS_ACTIONS, dispatch),
  };
}

function mapStateToProps(state) {
  return {
    accountReducer: state.accountReducer,
    debugReducer: state.debugReducer,
    patreosReducer: state.patreosReducer,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatr);
