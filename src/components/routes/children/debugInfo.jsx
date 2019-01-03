import React from 'react';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';

import EosReader from '../../../utils/eos_reader';

import * as DEBUG_ACTIONS from '../../../actions/debug_actions';

class DebugInfo extends React.Component {

  constructor(props) {
    super(props);
    this.config = this.props.config;
    this.eosReader = new EosReader(this.props.eos);
  }

  accountInfoUpdate() {
    if(this.props.scatterEos != null) {
      this.getEOSBalance();
      this.getPATRBalance();
      this.getRecurringPayBalances();
    }
  }

  componentDidMount() {
    this.props.debugActions.updateDebugEosAccountStr('testplanet1x');
    this.accountInfoUpdate();
    this.interval = setInterval(() => this.accountInfoUpdate(), this.config.updateInterval);
  }

  componentDidUpdate(prevProps) {
    // This means we got all info from app.js
    if (prevProps.scatterEos !== this.props.scatterEos) {
      this.accountInfoUpdate();
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {
      debugEosAccountStr,
      debugEosAccountInfoObj,
      debugEosBalanceAmt,
      debugPatrBalanceAmt,
      debugPledgesReceivedArr,
      debugPledgesGivenArr,
      debugBalancesArr,
      debugSubscribersArr,
      debugSubscriptionsArr
    } = this.props.debugReducer;

    return (
      <div className='account-container'>
        <div className='container rounded p-5 border border-patreos bg-dark mb-3'>
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
              { this.props.debugReducer.debugEosBalanceAmt }
            </div>
          </div>
          <div className='row'>
            <div className='col-m mr-1'>
              PATR Balance:
            </div>
            <div className='col-m'>
              { this.props.debugReducer.debugPatrBalanceAmt }
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
              { this.props.debugReducer.debugBalancesArr.map((info, index) => <div key={ index }>{ info.quantity }</div>) }
            </div>
          </div>
        </div>
      </div>
    );
  }

  getEOSBalance = () => {
    this.eosReader.getBalance(
      this.config.code.eosiotoken,
      this.props.debugReducer.debugEosAccountStr,
      this.config.systemSymbol,
      (val) => this.props.debugActions.updateDebugEosBalanceAmt(val)
    );
  };

  getPATRBalance = () => {
    this.eosReader.getBalance(
      this.config.code.patreostoken,
      this.props.debugReducer.debugEosAccountStr,
      this.config.patreosSymbol,
      (val) => this.props.debugActions.updateDebugPatrBalanceAmt(val)
    );
  };

  getRecurringPayBalances = () => {
    this.eosReader.getTable(
      {
        "json": true,
        "scope": this.props.debugReducer.debugEosAccountStr,
        "code": this.config.code.recurringpay,
        "table": 'balances',
        "limit": 10
      },
      (val) => this.props.debugActions.updateDebugBalancesArr(val)
    );
  };

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
