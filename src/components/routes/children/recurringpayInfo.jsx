import React from 'react';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import util from 'util';

import * as RECURRINGPAY_ACTIONS from '../../../actions/recurringpay_actions';
import TransactionBuilder from '../../../utils/transaction_builder';

class RecurringPayInfo extends React.Component {

  constructor(props) {
    super(props);
    this.config = this.props.config;
    this.transactionBuilder = new TransactionBuilder(this.config);
  }

  componentDidMount() {
    this.props.recurringpayActions.updateDepositTokenSymbolStr('PATR');
    this.props.recurringpayActions.updateWithdrawTokenSymbolStr('PATR');
    this.props.recurringpayActions.updateDepositTokenContractStr('patreostoken');
    this.props.recurringpayActions.updateWithdrawTokenContractStr('patreostoken');
  }

  componentDidUpdate(prevProps) {

  }

  render() {
    const {
      balancesArr,
      subscribersArr,
      subscriptionsArr,
      depositAmt,
      withdrawAmt,
      depositTokenContractStr,
      depositTokenSymbolStr,
      withdrawTokenContractStr,
      withdrawTokenSymbolStr,
      subscribeToAccountStr,
      subscriptionAmt,
      subscriptionCycleNum
    } = this.props.recurringpayReducer;

    return (
      <div className='account-container'>
      <div className='container rounded p-5 col-xs-6 col-lg-4 border border-patreos bg-light mb-3'>
        <div className='row'>
          <div className='col-m'>
            <h3>RecurringPay Deposits</h3>
          </div>
        </div>
        <br/>
        <div className='row'>
          <div className='col-m'>
            { this.props.recurringpayBalancesArr.map((info, index) => <div key={ index }>{ info.quantity }</div>) }
          </div>
        </div>
        <br/>
        <div className='row'>
          <div className='col-m mr-1'>
            Quantity to Deposit:
          </div>
          <div className='col-m'>
            { depositAmt } { depositTokenSymbolStr }
          </div>
        </div>
        <div className='row'>
          <div className='input-group mb-3'>
            <input type='text' className='form-control' placeholder={ '0.0000' }  aria-label='Amount (to the nearest dollar)' onChange={ this.updateDepositAmt } />
            <div className='input-group-append'>
              <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  { depositTokenSymbolStr }
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a className="dropdown-item" onClick={ () => { this.updateDepositTokenContractStr('patreostoken'); this.updateDepositTokenSymbolStr('PATR') } }>PATR</a>
                <a className="dropdown-item" onClick={ () => { this.updateDepositTokenContractStr('eosio.token'); this.updateDepositTokenSymbolStr('EOS') } }>EOS</a>
                </div>
              </div>
            </div>
          </div>
          <button className='btn btn-patreos' onClick={ () => this.deposit() }>Deposit</button>
        </div>
        <br/><br/>
        <div className='row'>
          <div className='col-m mr-1'>
            Quantity to Withdraw:
          </div>
          <div className='col-m'>
            { withdrawAmt } { withdrawTokenSymbolStr }
          </div>
        </div>
        <div className='row'>
          <div className='input-group mb-3'>
            <input type='text' className='form-control' placeholder={ '0.0000' }  aria-label='Amount (to the nearest dollar)' onChange={ this.updateWithdrawAmt } />
            <div className='input-group-append'>
              <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  { withdrawTokenSymbolStr }
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a className="dropdown-item" onClick={ () => { this.updateWithdrawTokenContractStr('patreostoken'); this.updateWithdrawTokenSymbolStr('PATR') } }>PATR</a>
                <a className="dropdown-item" onClick={ () => { this.updateWithdrawTokenContractStr('eosio.token'); this.updateWithdrawTokenSymbolStr('EOS') } }>EOS</a>
                </div>
              </div>
            </div>
          </div>
          <button className='btn btn-patreos' onClick={ () => this.withdraw() }>Withdraw</button>
        </div>
      </div>
      </div>
    );
  }

  deposit = () => {
    const transaction = this.transactionBuilder.transfer(this.props.eosAccountStr,
      this.config.code.recurringpay, this.props.recurringpayReducer.depositAmt, 'Deposit | <3',
      this.props.recurringpayReducer.depositTokenContractStr, this.props.recurringpayReducer.depositTokenSymbolStr);
    this.props.scatterEos.transaction(transaction);
  };

  withdraw = () => {
    const quantity = util.format(
      '%s %s',
      this.props.recurringpayReducer.withdrawAmt,
      this.props.recurringpayReducer.withdrawTokenSymbolStr
    );
    const transaction = this.transactionBuilder.withdraw(
      this.props.eosAccountStr,
      this.props.recurringpayReducer.withdrawTokenContractStr,
      quantity
    );
    this.props.scatterEos.transaction(transaction);
  };

  updateDepositAmt = (input) => {
    this.props.recurringpayActions.updateDepositAmt(input.target.value);
  };

  updateWithdrawAmt = (input) => {
    this.props.recurringpayActions.updateWithdrawAmt(input.target.value);
  };

  updateDepositTokenSymbolStr = (input) => {
    this.props.recurringpayActions.updateDepositTokenSymbolStr(input);
  };

  updateDepositTokenContractStr = (input) => {
    this.props.recurringpayActions.updateDepositTokenContractStr(input);
  };

  updateWithdrawTokenSymbolStr = (input) => {
    this.props.recurringpayActions.updateWithdrawTokenSymbolStr(input);
  };

  updateWithdrawTokenContractStr = (input) => {
    this.props.recurringpayActions.updateWithdrawTokenContractStr(input);
  };

}

function mapDispatchToProps(dispatch) {
  return {
    recurringpayActions: bindActionCreators(RECURRINGPAY_ACTIONS, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    recurringpayReducer: state.recurringpayReducer
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecurringPayInfo);
