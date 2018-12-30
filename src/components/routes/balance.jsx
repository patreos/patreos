import React from 'react';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';

import AccountInfo from './children/accountInfo';
import DebugInfo from './children/debugInfo';
import PatreosTokenInfo from './children/patreosTokenInfo';
import RecurringPayInfo from './children/recurringpayInfo';

class Balance extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <PatreosTokenInfo eos={this.props.eos} scatterEos={ this.props.scatterEos } config={ this.props.config } eosAccountStr={ this.props.eosAccountStr } patrBalanceAmt={ this.props.patrBalanceAmt } recurringpayBalancesArr={ this.props.recurringpayBalancesArr }/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Balance);
