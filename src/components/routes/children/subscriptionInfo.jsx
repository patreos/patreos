import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import Eos from 'eosjs';
import config from 'react-global-configuration';

import * as PATREOS_ACTIONS from '../../../actions/patreos_actions';
import TransactionBuilder from '../../../utils/transaction_builder';
import EosReader from '../../../utils/eos_reader'

class SubscriptionInfo extends React.Component {

  constructor(props) {
    super(props);
    this.config = this.props.config;
    this.transactionBuilder = new TransactionBuilder(this.config);
    this.eosReader = new EosReader(this.props.eos);
  }

  updatePatreosInfo() {
    if(this.props.scatterEos != null) {
      this.getPledges();
    }
  }

  componentDidUpdate(prevProps) {
    // This means we got all info from app.js
    if (prevProps.scatterEos !== this.props.scatterEos) {
      this.updatePatreosInfo();
    }
    if (prevProps.patreosReducer.pledgesGivenArr !== this.props.patreosReducer.pledgesGivenArr) {
      this.updatePledgeDom(this.props.patreosReducer.pledgesGivenArr);
    }
  }

  componentDidMount() {
    this.updatePatreosInfo();
    this.interval = setInterval(() => this.updatePatreosInfo(), this.config.updateInterval);
    this.props.patreosActions.updatePledgeTokenSymbolStr('PATR');
    this.props.patreosActions.updatePledgeTokenContractStr('patreostoken');
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
      pledgeTokenContractStr, pledgeAmt, pledgeCycleNum,
      pledgesReceivedArr, pledgesGivenArr

    } = this.props.patreosReducer;

    return (
      <div className='token-container'>
        <div className='container rounded p-5 col-xs-6 col-lg-4 border border-patreos bg-light mb-3'>
          <div className='row'>
            <div className='col-m'>
              <h3>Subscriptions</h3>
            </div>
          </div>
          <br/>
          <div className='row'>
            <div id="pledge-list" className='col-m'>
            </div>
          </div>
        </div>
      </div>
    );
  }

  calculatePendingPledges = (pending, lastExecuted, cycleSeconds) => {
    let date = new Date();
    let seconds = date.getTime() / 1000;
    let due = (seconds - lastExecuted) / cycleSeconds;
    return Math.floor( pending + due);
  }

  claimSubscription = (from, to) => {
    const transaction = this.transactionBuilder.process(this.config.code.patreosnexus, from, to);
    this.props.scatterEos.transaction(transaction);
  }

  updatePledgeDom = (pledges) => {
    if(pledges == null) {
      return;
    }
    var indents = [];
    for (var i = 0; i < pledges.length; i++) {
      let claimOnClick = this.claimSubscription.bind(this, pledges[i]['from'], pledges[i]['to']);
      let subscriptionsDue = this.calculatePendingPledges(pledges[i]['pending_payments'], pledges[i]['last_executed'], pledges[i]['cycle_seconds']);
      indents.push(
        <div className='row' key={'pledges-' + i}>
          <span className='col' key={'creator-' + i}>Creator: {pledges[i]['to']}</span>
          <span className='col' key={'pledge-' + i}>Pledge: {pledges[i]['token_profile_amount']['quantity']}</span>
          <span className='col' key={'days-' + i}>Seconds: {pledges[i]['cycle_seconds']}</span>
          <span className='col' key={'execution-' + i}>Times Pledged: {pledges[i]['execution_count']}</span>
          <button type="button" className="col close" aria-label="Close" key={'claim-button-' + i} onClick={ claimOnClick } >
            <span aria-hidden="true">Pay ({ subscriptionsDue })</span>
          </button>
        </div>
      );
      if(i < pledges.length - 1) {
        indents.push(
          <br key={'pledges-break-' + i}/>
        );
      }
    }
    ReactDOM.render(indents, document.getElementById('pledge-list'));
  }

  getPledges = () => {
    this.props.eos.getTableRows({
      "json": true,
      "scope": 'patreosnexus',
      "code": this.config.code.recurringpay,
      "table": "agreements",
      "index_position": 3,
      "table_key": 'from',
      "key_type": 'i64',
      "lower_bound": this.props.eosAccountStr,
      "limit": 10
    }).then(result => {
      this.props.patreosActions.updatePledgesGivenArr(result.rows);
    }).catch((error) =>{
      console.log(error);
    });
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

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionInfo);
