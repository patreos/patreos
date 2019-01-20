import React from 'react';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';

import Sidebar from '../sidebar';
import Menu from '../menu';

import PatreosInfo from './children/patreosInfo';

class Pledge extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='wrapper'>
        <Sidebar pledgeMenuActive={ 'active' } config={ this.props.config } eos={this.props.eos} scatterEos={ this.props.scatterEos }/>
        <div id="content">
            <div>
              <Menu config={ this.props.config } eos={this.props.eos} scatterEos={ this.props.scatterEos }/>
              <PatreosInfo eos={this.props.eos} scatterEos={ this.props.scatterEos } config={ this.props.config } eosAccountStr={ this.props.eosAccountStr } patrBalanceAmt={ this.props.patrBalanceAmt } recurringpayBalancesArr={ this.props.recurringpayBalancesArr }/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Pledge);
