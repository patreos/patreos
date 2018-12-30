import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import Eos from 'eosjs';
import config from 'react-global-configuration';

import * as PATREOS_ACTIONS from '../../../actions/patreos_actions';
import TransactionBuilder from '../../../utils/transaction_builder';
import EosReader from '../../../utils/eos_reader'

class PatreosTokenInfo extends React.Component {

  constructor(props) {
    super(props);
    this.config = this.props.config;
    this.transactionBuilder = new TransactionBuilder(this.config);
    this.eosReader = new EosReader(this.props.eos);
  }

  updatePatreosInfo() {
    if(this.props.scatterEos != null) {
      this.getStakedBalanceAmt();
    }
  }

  componentDidUpdate(prevProps) {

  }

  componentDidMount() {
    this.updatePatreosInfo();
    this.interval = setInterval(() => this.updatePatreosInfo(), this.config.updateInterval);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {

    const {
      balanceAmt, stakedBalanceAmt, transferToAccountStr, transferAmt, stakeAmt,
      unstakeAmt, followAccountStr, creatorNameStr, creatorDescriptionStr, creatorBannerStr,
      creatorImageStr, publicationTitleStr, publicationDescriptionStr, publicationUrlStr,
      publicationImageStr,
      pledgeTokenSymbolStr, pledgeTokenContractStr, pledgeToAccountStr, pledgeAmt, pledgeCycleNum,
      pledgesReceivedArr, pledgesGivenArr

    } = this.props.patreosReducer;

    return (
      <div className='token-container'>
        <div className='container bg-light rounded p-5 col-xs-6 col-lg-4 border border-patreos bg-light mb-3'>
          <div className='row'>
            <div className='col-m'>
              <h3>PATR Balance</h3>
            </div>
          </div>
          <div className='row'>
            <div className='col-m'>
              { this.props.patrBalanceAmt }
            </div>
          </div>
          <br/>
          <div className='row'>
            <div className='col-m mr-1'>
              Send:
            </div>
            <div className='col-m'>
              { transferAmt } PTR
            </div>
            <div className='input-group mb-3'>
              <input type='text' className='form-control' placeholder={ '0.0000' }  aria-label='Amount (to the nearest dollar)' onChange={ this.updateTransferAmt } />
              <div className='input-group-append'>
                <span className='input-group-text'>PTR</span>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-m mr-1'>
              Receiver Account:
            </div>
            <div className='col-m'>
              { transferToAccountStr }
            </div>
          </div>
          <div className='row'>
            <div className='col-m input-group mb-3'>
              <input className='form-control' type='text' size='12' placeholder='Receiver Account' onChange={ this.updateTransferToAccountStr } />
            </div>
            <button className='btn btn-patreos' onClick={ () => this.sendPatreosToken() }>Send Transaction</button>
          </div>
        </div>
        <div className='container rounded p-5 col-xs-6 col-lg-4 border border-patreos bg-light mb-3'>
          <div className='row'>
            <div className='col-m'>
              <h3>Staked PATR</h3>
            </div>
          </div>
          <div className='row'>
            <div className='col-m'>
              { stakedBalanceAmt } PATR
            </div>
          </div>
          <br/>
          <div className='row'>
            <div className='col-m mr-1'>
              Quantity to Stake:
            </div>
            <div className='col-m'>
              { stakeAmt } PTR
            </div>
          </div>
          <div className='row'>
            <div className='input-group mb-3'>
              <input type='text' className='form-control' placeholder={ '0.0000' }  aria-label='Amount (to the nearest dollar)' onChange={ this.updateStakeAmt } />
              <div className='input-group-append'>
                <span className='input-group-text'>PTR</span>
              </div>
            </div>
            <button className='btn btn-patreos' onClick={ () => this.stakePatreos() }>Stake</button>
          </div>
          <br/>
          <div className='row'>
            <div className='col-m mr-1'>
              Quantity to Unstake:
            </div>
            <div className='col-m'>
              { unstakeAmt } PTR
            </div>
          </div>
          <div className='row'>
            <div className='input-group mb-3'>
              <input type='text' className='form-control' placeholder={ '0.0000' } aria-label='Amount (to the nearest dollar)' onChange={ this.updateUnstakeAmt } />
              <div className='input-group-append'>
                <span className='input-group-text'>PTR</span>
              </div>
            </div>
            <button className='btn btn-patreos' onClick={ () => this.unstakePatreos() }>Unstake</button>
          </div>
        </div>
      </div>
    );
  }

  updateTransferAmt = (input) => {
    this.props.patreosActions.updateTransferAmt(input.target.value);
  };

  updateTransferToAccountStr = (input) => {
    this.props.patreosActions.updateTransferToAccountStr(input.target.value);
  };

  updateStakeAmt = (input) => {
    this.props.patreosActions.updateStakeAmt(input.target.value);
  };

  updateUnstakeAmt = (input) => {
    this.props.patreosActions.updateUnstakeAmt(input.target.value);
  };

  sendPatreosToken = () => {
    const transferToAccountStr = this.props.patreosReducer.transferToAccountStr;
    if(transferToAccountStr == '') {
      alert('receiver account cannot be blank');
      return;
    }

    const transaction = this.transactionBuilder.transfer(
      this.props.eosAccountStr,
      transferToAccountStr,
      this.props.patreosReducer.transferAmt,
      'Transfer <3',
      this.config.code.patreostoken,
      this.config.patreosSymbol
    );
    this.props.scatterEos.transaction(transaction);
  };

  stakePatreos = () => {
    const transaction = this.transactionBuilder.stake(this.props.eosAccountStr, this.props.patreosReducer.stakeAmt);
    this.props.scatterEos.transaction(transaction);
  };

  unstakePatreos = () => {
    const transaction = this.transactionBuilder.unstake(this.props.eosAccountStr, this.props.patreosReducer.unstakeAmt);
    this.props.scatterEos.transaction(transaction);
  };

  getStakedBalanceAmt = () => {
    this.eosReader.getTable(
      this.config.code.patreostoken,
      this.props.eosAccountStr,
      'stakes',
      (val) => {
        var amt = (val.length > 0) ? val[0].balance.replace(' PATR', '') : '0.0000'
        this.props.patreosActions.updateStakedBalanceAmt(amt);
      }
    );
  };

}

function mapDispatchToProps(dispatch) {
  return {
    patreosActions: bindActionCreators(PATREOS_ACTIONS, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    patreosReducer: state.patreosReducer
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PatreosTokenInfo);
