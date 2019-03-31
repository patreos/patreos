import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import Eos from 'eosjs';
import config from 'react-global-configuration';
import ReactTooltip from 'react-tooltip'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor'

import * as PATREOS_ACTIONS from '../../../actions/patreos_actions';

import TransactionBuilder from '../../../utils/transaction_builder';
import EosReader from '../../../utils/eos_reader'

import logo from '../../../../public/img/patreos-logo.svg';
import hero from '../../../../public/img/hero.svg';
import icnPatreos from '../../../../public/img/icn-patreos.svg';

import Header from './header';

class PatreosStake extends React.Component {

  constructor(props) {
    super(props);
    this.config = this.props.config;
    this.transactionBuilder = new TransactionBuilder(this.config);
    this.eosReader = new EosReader(this.props.eos);
    this.scatterHelper = this.props.scatterHelper;
  }

  updateComponentData() {
    if(Object.keys(this.props.scatterEos).length > 0 && this.scatterHelper.getScatterIdentity()) {
      if(this.props.eosAccountStr) {
        this.getStakedBalanceAmt();
      }
    }
  }

  componentDidUpdate(prevProps) {
    // This means we got all info from app.js
    if (prevProps.scatterEos !== this.props.scatterEos) {
      this.updateComponentData();
    }
  }

  componentWillMount() {
    this.props.patreosActions.updateStakedBalanceAmt('0.0000 PATR');
  }

  componentDidMount() {
    this.updateComponentData();
    this.interval = setInterval(() => this.updateComponentData(), this.config.updateInterval);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {

    const {
      stakedBalanceAmt
    } = this.props.patreosReducer;

    const isConnectedToScatterBool = this.props.scatterDetectionStr == 'true';
    let conditionalDom;

    if (isConnectedToScatterBool) {
      conditionalDom = (
        <div className="col-md-6 pr-5 mb-5">
          <ToastContainer/>
          <div className="row">

            <div className="col">
              <h2>Account Overview</h2>

              <div className="d-flex flex-row my-3">
                <div>
                  <dt>Account Name</dt>
                  <dd>{ this.props.eosAccountStr }</dd>
                </div>
              </div>
              <div className="d-flex flex-row align-items-start my-3">
                <div className="mr-5">
                  <dt>EOS Balance</dt>
                  <dd>{ this.props.eosBalanceAmt }</dd>
                </div>
                <div className="mr-5">
                  <dt>PATR Balance</dt>
                  <dd>{ this.props.patrBalanceAmt }</dd>
                </div>
                <div className="mr-5">
                  <ReactTooltip />
                  <dt>Staked PATR <i className="fas fa-question-circle" data-container="body" data-toggle="popover" data-placement="right" data-tip="When you stake PATR you are eligible to earn network rewards in proportion to the amount of PATR you stake."></i></dt>
                  <dd>{ stakedBalanceAmt }</dd>
                </div>
              </div>
            </div>
          </div>
          <div className="row my-3">
            <div className="col">
              <h4 className="alt">Earn more PATR</h4>
              <p>Pledging is coming soon. In the meantime, stake your PATR balance to start earning rewards! </p>
              <label htmlFor="stake">Stake PATR</label>
              <div className="input-group mb-3">
                <input type="text" className="form-control" id="stake" placeholder="Amount to stake" onChange={ this.updateStakeAmt } />
                <div className="input-group-append">
                  <button className="btn btn-primary" onClick={ () => this.stakePatreos() } type="button" id="">Stake</button>
                </div>
              </div>
              <label htmlFor="unstake">Unstake PATR</label>
              <div className="input-group">
                <input type="text" className="form-control" id="unstake" placeholder="Amount to unstake" onChange={ this.updateUnstakeAmt } />
                <div className="input-group-append">
                  <button className="btn btn-outline-secondary" onClick={ () => this.unstakePatreos() } type="button" id="">Unstake</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      conditionalDom = (
        <div className="col-md-6 pr-5 mb-5">
          <h2>Account Overview</h2>
          <p className="lead">Got some PATR from the Airdrop? Connect your Scatter Desktop wallet to check your balance and earn even more.</p>
          <button onClick={ () => this.scatterHelper.connectScatter( () => { this.updateComponentData() } ) } role="button" className="btn btn-primary btn-lg btn-block">Connect Scatter Desktop</button>
        </div>
      );
    }

    return (
      <main role="main">
        <div className="container">

        <Header {...this.props} scatterDetectionStr={ this.props.scatterDetectionStr } parent={this} />

          <div className="row">

            {conditionalDom}

            <div className="col-md-6">
              <img src={hero} width="100%" height="100%" className="d-none d-md-block" />
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

  updateTransferAmt = (input) => {
    this.props.patreosActions.updateTransferAmt(input.target.value);
  };

  updateTransferToAccountStr = (input) => {
    this.props.patreosActions.updateTransferToAccountStr(input.target.value);
  };

  updateStakeAmt = (input) => {
    this.props.patreosActions.updateStakeAmt(input.target.value);
  };

  updateUnstakeAmt = (input) => {
    this.props.patreosActions.updateUnstakeAmt(input.target.value);
  };

  sendPatreosToken = () => {
    const transferToAccountStr = this.props.patreosReducer.transferToAccountStr;
    if(transferToAccountStr == '') {
      alert('receiver account cannot be blank');
      return;
    }

    let amt = this.props.patreosReducer.transferAmt
    try {
      if (Number(amt) <= 0) throw new Error("Enter a positive ammount");
      amt = Eos.modules.format.DecimalPad(this.props.patreosReducer.transferAmt, 4)
    } catch(error) {
      return toast.error("Try an amount with 4 decimal places ;)", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 4000,
        className: css({ background: '#9B3042' }),
        bodyClassName: css({ fontFamily: 'Proxima Nova', fontWeight: 'normal', fontSize: '.9em' })
      });
    }

    const transaction = this.transactionBuilder.transfer(
      this.props.eosAccountStr,
      transferToAccountStr,
      amt,
      'Transfer <3',
      this.config.code.patreostoken,
      this.config.patreosSymbol
    );
    this.props.scatterEos.transaction(transaction);
  };

  stakePatreos = () => {
    let amt = this.props.patreosReducer.stakeAmt
    try {
      if (Number(amt) <= 0) throw new Error("Enter a positive ammount");
      amt = Eos.modules.format.DecimalPad(this.props.patreosReducer.stakeAmt, 4)
    } catch(error) {
      toast.error("Enter a positive amount with 4 decimal places ;)", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 4000,
        className: css({ background: '#9B3042' }),
        bodyClassName: css({ fontFamily: 'Proxima Nova', fontWeight: 'normal', fontSize: '.9em' })
      });
      return
    }
    const transaction = this.transactionBuilder.stake(this.props.eosAccountStr, amt, this.props.eosAccountAuthorityStr);
    this.props.scatterEos.transaction(transaction).then((response) => {
      let ret = response.processed.receipt.status;
      if(ret == 'executed') {
        toast.success("Stake Successful", {
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

  unstakePatreos = () => {
    let amt = this.props.patreosReducer.unstakeAmt
    try {
      if (Number(amt) <= 0) throw new Error("Enter a positive ammount");
      amt = Eos.modules.format.DecimalPad(this.props.patreosReducer.unstakeAmt, 4)
    } catch(error) {
      return toast.error("Enter a positive amount with 4 decimal places ;)", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 4000,
        className: css({ background: '#9B3042' }),
        bodyClassName: css({ fontFamily: 'Proxima Nova', fontWeight: 'normal', fontSize: '.9em' })
      });
    }
    const transaction = this.transactionBuilder.unstake(this.props.eosAccountStr, amt, this.props.eosAccountAuthorityStr);
    this.props.scatterEos.transaction(transaction).then((response) => {
      let ret = response.processed.receipt.status;
      if(ret == 'executed') {
        toast.success("Unstake Successful", {
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

  getStakedBalanceAmt = () => {
    this.eosReader.getTable(
      {
        "json": true,
        "scope": this.props.eosAccountStr,
        "code": this.config.code.patreostoken,
        "table": 'stakes',
        "limit": 10
      },
      (val) => {
        var amt = (val.length > 0) ? val[0].balance : '0.0000 PATR'
        this.props.patreosActions.updateStakedBalanceAmt(amt);
      }
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(PatreosStake);
