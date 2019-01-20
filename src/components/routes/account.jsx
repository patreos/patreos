import React from 'react';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';

import Sidebar from '../sidebar';
import Menu from '../menu';

import AccountInfo from './children/accountInfo';
import CreatorInfo from './children/creatorInfo';

class Account extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='wrapper'>
        <Sidebar accountMenuActive={ 'active' } config={ this.props.config } eos={this.props.eos} scatterEos={ this.props.scatterEos }/>
        <div id="content">
            <div>
              <Menu config={ this.props.config } eos={this.props.eos} scatterEos={ this.props.scatterEos }/>
              <AccountInfo eos={this.props.eos} scatterEos={ this.props.scatterEos } config={ this.props.config } eosAccountStr={ this.props.eosAccountStr } eosBalanceAmt={ this.props.eosBalanceAmt } patrBalanceAmt={ this.props.patrBalanceAmt } recurringpayBalancesArr={ this.props.recurringpayBalancesArr }/>
              <CreatorInfo eos={this.props.eos} scatterEos={ this.props.scatterEos } config={ this.props.config } eosAccountStr={ this.props.eosAccountStr } eosBalanceAmt={ this.props.eosBalanceAmt } patrBalanceAmt={ this.props.patrBalanceAmt } recurringpayBalancesArr={ this.props.recurringpayBalancesArr }/>
            </div>
        </div>
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
