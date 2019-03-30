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

import CreatorProfile from './elements/creatorProfile';

class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.network = this.props.config.requiredFields.accounts[0];
    this.eos = Eos({...this.props.config.eos});
    this.transactionBuilder = new TransactionBuilder(this.props.config);
    this.eosReader = new EosReader(this.eos);
    this.scatterHelper = new ScatterHelper(this.props);
  }

  updateComponentData() {
    if(Object.keys(this.props.accountReducer.scatterEosObj).length > 0 && this.scatterHelper.getScatterIdentity()) {
      if(this.props.accountReducer.eosAccountSt == '') {
        this.getEosAccountInfo();
      }
    }
  }

  componentWillMount() {
    this.props.accountActions.updateEosAccountStr('');

    this.scatterHelper.recoverScatter( () => { this.updateComponentData() } );
  }

  componentDidMount() {
    this.interval = setInterval(() => this.updateComponentData(), this.props.config.updateInterval);
  }

  componentDidUpdate(prevProps) {

  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <CreatorProfile eos={this.eos} scatterEos={ this.props.accountReducer.scatterEosObj } scatterDetectionStr={ this.props.accountReducer.scatterDetectionStr } config={ this.props.config } eosAccountStr={ this.props.accountReducer.eosAccountStr } eosAccountAuthorityStr={ this.props.accountReducer.eosAccountAuthorityStr } scatterHelper={this.scatterHelper} />
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

}

function mapDispatchToProps(dispatch) {
  return {
    accountActions: bindActionCreators(ACCOUNT_ACTIONS, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    accountReducer: state.accountReducer
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
