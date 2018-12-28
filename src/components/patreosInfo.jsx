import React from 'react';
import ReactDOM from 'react-dom';
import {bindActionCreators} from 'redux';
import * as PATREOS_ACTIONS from '../actions/patreos_actions';
import connect from 'react-redux/es/connect/connect';
import Eos from 'eosjs';
import config from 'react-global-configuration';
import TransactionBuilder from '../utils/transaction_builder';
import EosReader from '../utils/eos_reader'

class PatreosInfo extends React.Component {

  constructor(props) {
    super(props);
    this.config = this.props.config;
    this.transactionBuilder = new TransactionBuilder(this.config);
    this.eosReader = new EosReader(this.props.eos);
  }

  updatePatreosInfo() {
    if(this.props.scatterEos != null) {
      this.getStakedBalanceAmt();
      this.getPledges();
    }
  }

  componentDidUpdate(prevProps) {
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
      pledgeTokenSymbolStr, pledgeTokenContractStr, pledgeToAccountStr, pledgeAmt, pledgeCycleNum,
      pledgesReceivedArr, pledgesGivenArr

    } = this.props.patreosReducer;

    return (
      <div className='token-container'>
        <div className='container bg-light rounded p-5 col-xs-6 col-lg-4 border border-patreos bg-light mb-3'>
          <div className='row'>
            <div className='col-m'>
              <h3>Send PATR</h3>
            </div>
          </div>
          <div className='row'>
            <div className='col-m mr-1'>
              Unstaked Balance:
            </div>
            <div className='col-m'>
              { this.props.patrBalanceAmt }
            </div>
          </div>
          <br/>
          <div className='row'>
            <div className='col-m mr-1'>
              Send:
            </div>
            <div className='col-m'>
              { transferAmt } PTR
            </div>
            <div className='input-group mb-3'>
              <input type='text' className='form-control' placeholder={ '0.0000' }  aria-label='Amount (to the nearest dollar)' onChange={ this.updateTransferAmt } />
              <div className='input-group-append'>
                <span className='input-group-text'>PTR</span>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-m mr-1'>
              Receiver Account:
            </div>
            <div className='col-m'>
              { transferToAccountStr }
            </div>
          </div>
          <div className='row'>
            <div className='col-m input-group mb-3'>
              <input className='form-control' type='text' size='12' placeholder='Receiver Account' onChange={ this.updateTransferToAccountStr } />
            </div>
            <button className='btn btn-patreos' onClick={ () => this.sendPatreosToken() }>Send Transaction</button>
          </div>
        </div>
        <div className='container rounded p-5 col-xs-6 col-lg-4 border border-patreos bg-light mb-3'>
          <div className='row'>
            <div className='col-m'>
              <h3>Stake PATR</h3>
            </div>
          </div>
          <div className='row'>
            <div className='col-m mr-1'>
              Staked PATR Balance:
            </div>
            <div className='col-m'>
              { stakedBalanceAmt } PATR
            </div>
          </div>
          <br/>
          <div className='row'>
            <div className='col-m mr-1'>
              Quantity to Stake:
            </div>
            <div className='col-m'>
              { stakeAmt } PTR
            </div>
          </div>
          <div className='row'>
            <div className='input-group mb-3'>
              <input type='text' className='form-control' placeholder={ '0.0000' }  aria-label='Amount (to the nearest dollar)' onChange={ this.updateStakeAmt } />
              <div className='input-group-append'>
                <span className='input-group-text'>PTR</span>
              </div>
            </div>
            <button className='btn btn-patreos' onClick={ () => this.stakePatreos() }>Stake</button>
          </div>
          <br/>
          <div className='row'>
            <div className='col-m mr-1'>
              Quantity to Unstake:
            </div>
            <div className='col-m'>
              { unstakeAmt } PTR
            </div>
          </div>
          <div className='row'>
            <div className='input-group mb-3'>
              <input type='text' className='form-control' placeholder={ '0.0000' } aria-label='Amount (to the nearest dollar)' onChange={ this.updateUnstakeAmt } />
              <div className='input-group-append'>
                <span className='input-group-text'>PTR</span>
              </div>
            </div>
            <button className='btn btn-patreos' onClick={ () => this.unstakePatreos() }>Unstake</button>
          </div>
        </div>
        <div className='container rounded p-5 col-xs-6 col-lg-4 border border-patreos bg-light mb-3'>
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
              { pledgeToAccountStr }
            </div>
          </div>
          <div className='row'>
            <div className='col-m input-group mb-3'>
              <input className='form-control' type='text' size='12' placeholder='Receiver Account' onChange={ this.updatePledgeToAccountStr } />
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
            <div className='col-m mr-1'>
              Pledges:
            </div>
            <div id="pledge-list" className='col-m'>
            </div>
          </div>

        </div>
      </div>
    );
  }

  updateTransferAmt = (input) => {
    this.props.patreosActions.updateTransferAmt(input.target.value);
  };

  updateTransferToAccountStr = (input) => {
    this.props.patreosActions.updateTransferToAccountStr(input.target.value);
  };

  updatePledgeTokenContractStr = (input) => {
    this.props.patreosActions.updatePledgeTokenContractStr(input);
  };

  updatePledgeTokenSymbolStr = (input) => {
    this.props.patreosActions.updatePledgeTokenSymbolStr(input);
  };

  updateStakeAmt = (input) => {
    this.props.patreosActions.updateStakeAmt(input.target.value);
  };

  updateUnstakeAmt = (input) => {
    this.props.patreosActions.updateUnstakeAmt(input.target.value);
  };

  updatePledgeAmt = (input) => {
    this.props.patreosActions.updatePledgeAmt(input.target.value);
  };

  updatePledgeToAccountStr = (input) => {
    this.props.patreosActions.updatePledgeToAccountStr(input.target.value);
  };

  sendPatreosToken = () => {
    const transferToAccountStr = this.props.patreosReducer.transferToAccountStr;
    if(transferToAccountStr == '') {
      alert('receiver account cannot be blank');
      return;
    }

    const transaction = this.transactionBuilder.transfer(
      this.props.eosAccountStr,
      transferToAccountStr,
      this.props.patreosReducer.transferAmt,
      'Transfer <3',
      this.config.code.patreostoken,
      this.config.patreosSymbol
    );
    this.props.scatterEos.transaction(transaction);
  };

  stakePatreos = () => {
    const transaction = this.transactionBuilder.stake(this.props.eosAccountStr, this.props.patreosReducer.stakeAmt);
    this.props.scatterEos.transaction(transaction);
  };

  unstakePatreos = () => {
    const transaction = this.transactionBuilder.unstake(this.props.eosAccountStr, this.props.patreosReducer.unstakeAmt);
    this.props.scatterEos.transaction(transaction);
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
    console.log(this.props.eosAccountStr)
    console.log(this.props.patreosReducer.pledgeToAccountStr)
    console.log(this.props.patreosReducer.pledgeAmt)
    console.log(this.props.patreosReducer.pledgeTokenContractStr)
    console.log(this.props.patreosReducer.pledgeTokenSymbolStr)

    const transaction = this.transactionBuilder.recurringpayDepositThenExecutePledge(
      this.props.eosAccountStr,
      this.props.patreosReducer.pledgeToAccountStr,
      this.props.patreosReducer.pledgeAmt,
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
      this.props.patreosReducer.pledgeTokenContractStr,
      this.props.patreosReducer.pledgeTokenSymbolStr
    );
    this.props.scatterEos.transaction(transaction);
  };

  unpledgePatreos = () => {
    const transaction = this.transactionBuilder.unpledge(this.props.account, this.props.tokenInfo.receiverAccount);
    this.props.scatterEos.transaction(transaction);
  };

  getStakedBalanceAmt = () => {
    this.eosReader.getTable(
      this.config.code.patreostoken,
      this.props.eosAccountStr,
      'stakes',
      (val) => {
        var amt = (val.length > 0) ? val[0].balance.replace(' PATR', '') : '0.0000'
        this.props.patreosActions.updateStakedBalanceAmt(amt);
      }
    );
  };

  unpledgeByCreatorAccount = (creator) => {
    const transaction = this.transactionBuilder.unpledge(this.props.eosAccountStr, creator);
    this.props.scatterEos.transaction(transaction);
  }

  updatePledgeDom = (pledges) => {
    if(pledges == null) {
      return;
    }
    var indents = [];
    for (var i = 0; i < pledges.length; i++) {
      let boundItemClick = this.unpledgeByCreatorAccount.bind(this, pledges[i]['to']);
      indents.push(
        <div className='row' key={i}>
          <span className='col' key={4*i + 1}>Creator: {pledges[i]['to']}</span>
          <span className='col' key={4*i + 2}>Pledge: {pledges[i]['token_profile_amount']['quantity']}</span>
          <span className='col' key={4*i + 3}>Days: {pledges[i]['cycle_seconds']}</span>
          <button type="button" className="col close" aria-label="Close" key={4*i + 4} onClick={ boundItemClick } >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      );
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

export default connect(mapStateToProps, mapDispatchToProps)(PatreosInfo);
