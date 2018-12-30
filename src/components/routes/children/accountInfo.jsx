import React from 'react';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';

import * as ACCOUNT_ACTIONS from '../../../actions/account_actions';

class AccountInfo extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps) {
    // This means we got all info from app.js
    if (prevProps.scatterEos !== this.props.scatterEos) {

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
            <div className='col-m'>
              <h3>{ eosAccountStr }</h3>
            </div>
          </div>
          <br/>
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
