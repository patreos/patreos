import React from 'react';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import AccountInfo from './accountInfo';
import DebugInfo from './debugInfo';
import PatreosInfo from './patreosInfo';
import RecurringPayInfo from './recurringpayInfo';

class Account extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <AccountInfo eos={this.props.eos} scatterEos={ this.props.scatterEos } eosBalanceAmt={ this.props.eosBalanceAmt } patrBalanceAmt={ this.props.patrBalanceAmt } recurringpayBalancesArr={ this.props.recurringpayBalancesArr }/>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {};
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);
