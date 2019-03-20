import React from 'react';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';

import * as ACCOUNT_ACTIONS from '../../actions/account_actions';
import * as DEBUG_ACTIONS from '../../actions/debug_actions';
import * as PATREOS_ACTIONS from '../../actions/patreos_actions';

import TransactionBuilder from '../../utils/transaction_builder'
import EosReader from '../../utils/eos_reader'
import ScatterHelper from '../../utils/scatter'

import Eos from 'eosjs';

import PatreosStake from './elements/patreosStake';

class ManagePatr extends React.Component {

  constructor(props) {
    super(props);
    this.network = this.props.config.requiredFields.accounts[0];
    this.eos = Eos({...this.props.config.eos});
    this.transactionBuilder = new TransactionBuilder(this.props.config);
    this.eosReader = new EosReader(this.eos);
    this.scatterHelper = new ScatterHelper(this.props);
  }

  accountInfoUpdate() {
    if(Object.keys(this.props.accountReducer.scatterEosObj).length > 0 && this.scatterHelper.getScatterIdentity()) {
      this.getEOSBalance();
      this.getPATRBalance();
      this.getEosAccountInfo();
    }
  }

  componentWillMount() {
    this.props.accountActions.updateEosAccountStr('');
    this.props.accountActions.updateEosBalanceAmt('0.0000 EOS')
    this.props.patreosActions.updateBalanceAmt('0.0000 PATR')

    this.scatterHelper.recoverScatter( () => { this.accountInfoUpdate() } );
  }

  componentDidMount() {
    this.interval = setInterval(() => this.accountInfoUpdate(), this.props.config.updateInterval);
  }

  componentDidUpdate(prevProps) {
    //this.accountInfoUpdate()
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
      <PatreosStake eos={this.eos} scatterEos={ this.props.accountReducer.scatterEosObj } scatterDetectionStr={ this.props.accountReducer.scatterDetectionStr } config={ this.props.config } eosAccountStr={ this.props.accountReducer.eosAccountStr } eosAccountAuthorityStr={ this.props.accountReducer.eosAccountAuthorityStr } eosBalanceAmt={ this.props.accountReducer.eosBalanceAmt } patrBalanceAmt={ this.props.patreosReducer.balanceAmt } scatterHelper={this.scatterHelper} />
    );
  }

  getEosAccountInfo = () => {
    this.eosReader.getAccount(
      this.props.accountReducer.eosAccountStr,
      (val) => {
        this.props.accountActions.updateEosAccountInfoObj(val)
      }
    );
  };

  getEOSBalance = () => {
    this.eosReader.getBalance(
      this.props.config.code.eosiotoken,
      this.props.accountReducer.eosAccountStr,
      this.props.config.systemSymbol,
      (val) => {
        this.props.accountActions.updateEosBalanceAmt(val)
      }
    );
  };

  getPATRBalance = () => {
    this.eosReader.getBalance(
      this.props.config.code.patreostoken,
      this.props.accountReducer.eosAccountStr,
      this.props.config.patreosSymbol,
      (val) => {
        if(val) this.props.patreosActions.updateBalanceAmt(val)
      }
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
