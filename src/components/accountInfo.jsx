import React from 'react';
import {bindActionCreators} from 'redux';
import * as ACCOUNT_ACTIONS from '../actions/account_actions';
import connect from 'react-redux/es/connect/connect';

class AccountInfo extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.eosBalanceAmt !== this.props.eosBalanceAmt) {
      //console.log("Updated EOS Balance prop: " + this.props.eosBalanceAmt)
    }
    if (prevProps.patrBalanceAmt !== this.props.patrBalanceAmt) {
      //console.log("Updated PATR Balance prop: " + this.props.patrBalanceAmt)
    }
    if (prevProps.recurringpayBalancesArr !== this.props.recurringpayBalancesArr) {
      //console.log("Updated Vault Info prop: " + this.props.recurringpayBalancesArr)
    }
  }

  render() {
    const {
      eosAccountStr, eosAccountInfoObj, scatterDetectionStr, emailAddressStr
    } = this.props.accountReducer;

    return (
      <div className='account-container'>
        <div className='container rounded p-5 col-xs-6 col-lg-4 border border-patreos bg-light mb-3'>
          <div className='row'>
            <div className='col-m mr-1'>
              Scatter:
            </div>
            <div className='col-m'>
              { scatterDetectionStr }
            </div>
          </div>
          <br/>
          <div className='row'>
            <div className='col-m mr-1'>
              Account:
            </div>
            <div className='col-m'>
              <a href='https://www.patreos.com' target='_blank'>{ eosAccountStr }</a>
            </div>
          </div>
          <div className='row'>
            <div className='col-m mr-1'>
              EOS Balance:
            </div>
            <div className='col-m'>
              { this.props.eosBalanceAmt }
            </div>
          </div>
          <div className='row'>
            <div className='col-m mr-1'>
              PATR Balance:
            </div>
            <div className='col-m'>
              { this.props.patrBalanceAmt }
            </div>
          </div>
          <br/>
          <div className='row'>
            <div className='col-m mr-1'>
              RecurringPay Balances:
            </div>
          </div>
          <div className='row'>
            <div className='col-m'>
              { this.props.recurringpayBalancesArr.map((info, index) => <div key={ index }>{ info.quantity }</div>) }
            </div>
          </div>
        </div>
      </div>
    );
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo);
