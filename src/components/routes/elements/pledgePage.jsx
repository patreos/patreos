import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import Eos from 'eosjs';
import config from 'react-global-configuration';

import * as PATREOS_ACTIONS from '../../../actions/patreos_actions';
import * as CREATOR_ACTIONS from '../../../actions/creator_actions';

import TransactionBuilder from '../../../utils/transaction_builder';
import EosReader from '../../../utils/eos_reader'

import logo from '../../../../public/img/patreos-logo.svg';
import hero from '../../../../public/img/hero.svg';
import icnPatreos from '../../../../public/img/icn-patreos.svg';

import Header from './header';

class PledgePage extends React.Component {

  constructor(props) {
    super(props);
    this.config = this.props.config;
    this.transactionBuilder = new TransactionBuilder(this.config);
    this.eosReader = new EosReader(this.props.eos);
    this.scatterHelper = this.props.scatterHelper;
  }

  updateComponentData() {
    if(this.props.pledgeToAccountStr) {
      this.getCreatorProfile();
    }
  }

  componentDidUpdate(prevProps) {
    // This means we got all info from app.js
    if (prevProps.pledgeToAccountStr !== this.props.pledgeToAccountStr) {
      this.props.patreosActions.updatePledgeToAccountStr(this.props.pledgeToAccountStr);
      this.updateComponentData();
    }
  }

  componentDidMount() {
    this.updateComponentData();
    this.interval = setInterval(() => this.updateComponentData(), this.config.updateInterval);
    this.props.patreosActions.updatePledgeTokenSymbolStr('PATR');
    this.props.patreosActions.updatePledgeTokenContractStr('patreostoken');
    if(this.props.pledgeToAccountStr) {
      this.props.patreosActions.updatePledgeToAccountStr(this.props.pledgeToAccountStr);
    }
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
      pledgeTokenSymbolStr, pledgeTokenContractStr, pledgeToAccountStr, pledgeAmt, pledgeCycleNum,
      pledgesReceivedArr, pledgesGivenArr

    } = this.props.patreosReducer;

    const {
      creatorCurrentNameStr,
      creatorCurrentDescriptionStr,
      creatorCurrentBannerStr,
      creatorCurrentImageStr,

      creatorPublicationTitleStr,
      creatorPublicationDescriptionStr,
      creatorPublicationUrlStr,
      creatorPublicationImageStr,

      creatorExists
    } = this.props.creatorReducer;

    return (
      <main role="main">
        <div className="container">
          <Header {...this.props} scatterDetectionStr={ this.props.scatterDetectionStr } parent={this} />

          <div className='row'>
            <div className='col-m'>
              <h3>Manage Pledges</h3>
            </div>
          </div>
          <br/>
          <div className='row'>
            <div className='col-m mr-1'>
              Pledge To:
            </div>
            <div className='col-m'>
              { this.props.pledgeToAccountStr }
            </div>
            <div className='col-m'>
              <img src={ creatorCurrentImageStr } alt="Image" height="42" width="42"/>
            </div>
          </div>
          <div className='row'>
            <div className='col-m mr-1'>
              Pledge Amount:
            </div>
            <div className='col-m'>
              { pledgeAmt } { pledgeTokenSymbolStr }
            </div>
          </div>
          <div className='row'>
            <div className='input-group mb-3'>
              <input type='text' className='form-control' placeholder={ '0.0000' }  aria-label='Amount (to the nearest dollar)' onChange={ this.updatePledgeAmt } />
              <div className='input-group-append'>
                <div className="dropdown">
                  <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    { pledgeTokenSymbolStr }
                  </button>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a className="dropdown-item" onClick={ () => { this.updatePledgeTokenContractStr('patreostoken'); this.updatePledgeTokenSymbolStr('PATR') } }>PATR</a>
                  <a className="dropdown-item" onClick={ () => { this.updatePledgeTokenContractStr('eosio.token'); this.updatePledgeTokenSymbolStr('EOS') } }>EOS</a>
                  </div>
                </div>
              </div>
            </div>
            <button className='btn btn-patreos' onClick={ () => this.pledge() }>Pledge</button>
          </div>
          <br/>
          <div className='row'>
            <div id="pledge-list" className='col-m'>
            </div>
          </div>
        </div>
        <div className="container-fluid footer">
          <div className="row mt-5 py-5 mb-0">
            <div className="col text-center">
              <img src={icnPatreos} alt="" className="mb-5" />
              <ul className="list-inline">
                <li className="list-inline-item"><a href="mailto:hello@patreos.com">Contact</a></li>
                <li className="list-inline-item"><a href="mailto:press@patreos.com">Press</a></li>
                <li className="list-inline-item"><a href="/faq">FAQ</a></li>
                <li className="list-inline-item"><a href="/news">News</a></li>
                <li className="list-inline-item"><a href="https://t.me/patreos">Telegram</a></li>
                <li className="list-inline-item"><a href="https://twitter.com/PatreosDapp">Twitter</a></li>
              </ul>
              <p>All Rights Reserved, Patreos 2019</p>
            </div>
          </div>
        </div>
      </main>
    );
  }


  updatePledgeTokenContractStr = (input) => {
    this.props.patreosActions.updatePledgeTokenContractStr(input);
  };

  updatePledgeTokenSymbolStr = (input) => {
    this.props.patreosActions.updatePledgeTokenSymbolStr(input);
  };

  updatePledgeAmt = (input) => {
    this.props.patreosActions.updatePledgeAmt(input.target.value);
  };

  pledge = () => {
    var symbol = this.props.patreosReducer.pledgeTokenSymbolStr;
    var regex = undefined;
    switch(symbol) {
      case 'PATR':
        regex = /^0.0000 EOS/g;
        break;
      case 'EOS':
        regex = /^0.0000 EOS/g;
        break;
    }
    if(!regex) {
      console.log("Error, invalid token symbol");
      return;
    }
    var recurringpayEmpty = false;
    for (var i in this.props.recurringpayBalancesArr) {
      var ret = this.props.recurringpayBalancesArr[i].quantity.match(regex);
      if(ret) {
        recurringpayEmpty = true;
      }
    }
    if(recurringpayEmpty) {
      this.recurringpayDepositThenExecutePledge()
    } else {
      this.executePledge()
    }
  };

  recurringpayDepositThenExecutePledge = () => {
    const transaction = this.transactionBuilder.recurringpayDepositThenExecutePledge(
      this.props.eosAccountStr,
      this.props.patreosReducer.pledgeToAccountStr,
      this.props.patreosReducer.pledgeAmt,
      30,
      'PLEDGE <3',
      this.props.patreosReducer.pledgeTokenContractStr,
      this.props.patreosReducer.pledgeTokenSymbolStr
    );
    this.props.scatterEos.transaction(transaction);
  };

  executePledge = () => {
    const transaction = this.transactionBuilder.pledge(
      this.props.eosAccountStr,
      this.props.patreosReducer.pledgeToAccountStr,
      this.props.patreosReducer.pledgeAmt,
      30,
      this.props.patreosReducer.pledgeTokenContractStr,
      this.props.patreosReducer.pledgeTokenSymbolStr
    );
    this.props.scatterEos.transaction(transaction);
  };

  unpledgePatreos = () => {
    const transaction = this.transactionBuilder.unpledge(this.props.account, this.props.tokenInfo.receiverAccount);
    this.props.scatterEos.transaction(transaction);
  };

  unpledgeByCreatorAccount = (creator) => {
    const transaction = this.transactionBuilder.unpledge(this.props.eosAccountStr, creator);
    this.props.scatterEos.transaction(transaction);
  }

  getCreatorProfile = () => {
    this.eosReader.getTable(
      {
        "json": true,
        "scope": this.config.code.patreosnexus,
        "code": this.config.code.patreosnexus,
        "table": 'profiles',
        "lower_bound": this.props.pledgeToAccountStr,
        "limit": 1
      },
      (val) => {
        if(val.length > 0 && val[0].owner == this.props.pledgeToAccountStr) {
          this.props.creatorActions.updateCreatorCurrentNameStr(val[0].name);
          this.props.creatorActions.updateCreatorCurrentDescriptionStr(val[0].description);
          this.props.creatorActions.updateCreatorCurrentBannerStr(val[0].banner_url);
          this.props.creatorActions.updateCreatorCurrentImageStr(val[0].image_url);
        } else {
          console.log("Not a creator!")
        }
      }
    );
  };

}

function mapDispatchToProps(dispatch) {
  return {
    patreosActions: bindActionCreators(PATREOS_ACTIONS, dispatch),
    creatorActions: bindActionCreators(CREATOR_ACTIONS, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    patreosReducer: state.patreosReducer,
    creatorReducer: state.creatorReducer
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PledgePage);
