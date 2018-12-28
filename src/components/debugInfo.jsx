import React from 'react';
import {bindActionCreators} from 'redux';
import * as DEBUG_ACTIONS from '../actions/debug_actions';
import connect from 'react-redux/es/connect/connect';

class DebugInfo extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.debugActions.updateDebugEosAccountStr('testplanet1x');
  }

  componentDidUpdate(prevProps) {

  }

  render() {
    const {
      debugEosAccountStr, eosAccountInfoObj, eosBalanceAmt, patrBalanceAmt,
      pledgesReceivedArr, pledgesGivenArr, balancesArr, subscribersArr, subscriptionsArr
    } = this.props.debugReducer;

    return (
      <div className='account-container'>
        <div className='container rounded p-5 col-xs-6 col-lg-4 border border-patreos bg-light mb-3'>
          <div className='row'>
            <div className='col-m'>
              <h3>Debug Account</h3>
            </div>
          </div>
          <div className='row'>
            <div className='col-m mr-1'>
              Account:
            </div>
            <div className='col-m'>
              { this.props.debugReducer.debugEosAccountStr }
            </div>
          </div>
          <div className='row'>
            <div className='col-m mr-1'>
              EOS Balance:
            </div>
            <div className='col-m'>
              { this.props.debugReducer.eosBalanceAmt }
            </div>
          </div>
          <div className='row'>
            <div className='col-m mr-1'>
              PATR Balance:
            </div>
            <div className='col-m'>
              { this.props.debugReducer.patrBalanceAmt }
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
              { this.props.debugReducer.balancesArr.map((info, index) => <div key={ index }>{ info.quantity }</div>) }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    debugActions: bindActionCreators(DEBUG_ACTIONS, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    debugReducer: state.debugReducer
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DebugInfo);
