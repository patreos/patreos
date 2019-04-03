import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import Eos from 'eosjs';
import config from 'react-global-configuration';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor'

import * as PATREOS_ACTIONS from '../../../actions/patreos_actions';
import * as CREATOR_ACTIONS from '../../../actions/creator_actions';

import TransactionBuilder from '../../../utils/transaction_builder';
import EosReader from '../../../utils/eos_reader'

import logo from '../../../../public/img/patreos-logo.svg';
import hero from '../../../../public/img/hero.svg';
import icnPatreos from '../../../../public/img/icn-patreos.svg';

import Header from './header';
import PageNotFound from '../../routes/404';

class ManageAccount extends React.Component {

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

    let conditionalDom;
    if (this.props.selection == 'profile') {
      conditionalDom = (
        <div className='row'>
          <div className='col-m'>
            <h3>Manage Profile </h3>
          </div>
        </div>
      );
    } else if (this.props.selection == 'pledges') {
      conditionalDom = (
        <div className='row'>
          <div className='col-m'>
            <h3>Manage Pledges </h3>
          </div>
        </div>
      );
    } else if (this.props.selection == 'rewards') {
      conditionalDom = (
        <div className='row'>
          <div className='col-m'>
            <h3>Manage Rewards </h3>
          </div>
        </div>
      );
    } else {
      return <PageNotFound />
    }


    return (
      <main role="main">

        <div className="container">
          <ToastContainer/>
          <Header {...this.props} scatterDetectionStr={ this.props.scatterDetectionStr } parent={this} />

          { conditionalDom }
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
    var recurringpayEmpty = true;
    for (var i in this.props.recurringpayBalancesArr) {
      var ret = this.props.recurringpayBalancesArr[i].quantity.match(regex);
      if(ret) {
        recurringpayEmpty = false;
      }
    }
    if(recurringpayEmpty) {
      this.recurringpayDepositThenExecutePledge()
    } else {
      this.executePledge()
    }
  };

  recurringpayDepositThenExecutePledge = () => {

    let amt = this.props.patreosReducer.pledgeAmt
    try {
      if (Number(amt) <= 0) throw new Error("Enter a positive ammount");
      amt = Eos.modules.format.DecimalPad(this.props.patreosReducer.pledgeAmt, 4)
    } catch(error) {
      return toast.error("Try an amount with 4 decimal places ;)", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 4000,
        className: css({ background: '#9B3042' }),
        bodyClassName: css({ fontFamily: 'Proxima Nova', fontWeight: 'normal', fontSize: '.9em' })
      });
    }

    const transaction = this.transactionBuilder.recurringpayDepositThenExecutePledge(
      this.props.eosAccountStr,
      this.props.patreosReducer.pledgeToAccountStr,
      amt,
      30,
      'PLEDGE <3',
      this.props.patreosReducer.pledgeTokenContractStr,
      this.props.patreosReducer.pledgeTokenSymbolStr
    );
    this.props.scatterEos.transaction(transaction).then((response) => {
      let ret = response.processed.receipt.status;
      if(ret == 'executed') {
        toast.success("Pledge Successful", {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 2000,
          className: css({ background: '#1B866D' }),
          bodyClassName: css({ fontFamily: 'Proxima Nova', fontWeight: 'normal', fontSize: '.9em' })
        });
      }
    }).catch(err => {
      console.log(err);
      toast.error(JSON.parse(err).error.details[0].message, {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 4000,
        className: css({ background: '#9B3042' }),
        bodyClassName: css({ fontFamily: 'Proxima Nova', fontWeight: 'normal', fontSize: '.9em' })
      });
    });
  };

  executePledge = () => {

    let amt = this.props.patreosReducer.pledgeAmt
    try {
      if (Number(amt) <= 0) throw new Error("Enter a positive ammount");
      amt = Eos.modules.format.DecimalPad(this.props.patreosReducer.pledgeAmt, 4)
    } catch(error) {
      return toast.error("Try an amount with 4 decimal places ;)", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 4000,
        className: css({ background: '#9B3042' }),
        bodyClassName: css({ fontFamily: 'Proxima Nova', fontWeight: 'normal', fontSize: '.9em' })
      });
    }

    const transaction = this.transactionBuilder.pledge(
      this.props.eosAccountStr,
      this.props.patreosReducer.pledgeToAccountStr,
      amt,
      30,
      this.props.patreosReducer.pledgeTokenContractStr,
      this.props.patreosReducer.pledgeTokenSymbolStr
    );
    this.props.scatterEos.transaction(transaction).then((response) => {
      let ret = response.processed.receipt.status;
      if(ret == 'executed') {
        toast.success("Pledge Successful", {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 2000,
          className: css({ background: '#1B866D' }),
          bodyClassName: css({ fontFamily: 'Proxima Nova', fontWeight: 'normal', fontSize: '.9em' })
        });
      }
    }).catch(err => {
      console.log(err);
      toast.error(JSON.parse(err).error.details[0].message, {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 4000,
        className: css({ background: '#9B3042' }),
        bodyClassName: css({ fontFamily: 'Proxima Nova', fontWeight: 'normal', fontSize: '.9em' })
      });
    });
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageAccount);
