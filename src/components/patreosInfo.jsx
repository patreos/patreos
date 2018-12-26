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
    this.transaction_builder = new TransactionBuilder(this.config);
    this.eosReader = new EosReader(this.props.eos);
  }

  tokeInfoUpdate() {
    if(this.props.scatterEos != null) {
      //this.getVaultStakedBalance();
      this.getStakedBalanceAmt();
      //this.getPledges();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.patreosReducer.pledges !== this.props.patreosReducer.pledges) {
      //this.updatePledgeDom(this.props.tokenInfo.pledges);
    }
  }

  componentDidMount() {
    this.tokeInfoUpdate();
    this.interval = setInterval(() => this.tokeInfoUpdate(), this.config.updateInterval);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {

    const {
      balanceAmt, stakedBalanceAmt, transferToAccountStr, transferAmt, stakeAmt,
      unstakeAmt, followAccountStr, creatorNameStr, creatorDescriptionStr, creatorBannerStr,
      creatorImageStr, publicationTitleStr, publicationDescriptionStr, publicationUrlStr,
      publicationImageStr
    } = this.props.patreosReducer;

    return (
      <div className='token-container'>
        <div className='container bg-light rounded p-5 col-xs-6 col-lg-4 border border-patreos bg-light mb-3'>
          <div className='row'>
            <div className='col-m'>
              <h3>Send</h3>
            </div>
          </div>
          <div className='row'>
            <div className='col-m mr-1'>
              Unstaked Balance:
            </div>
            <div className='col-m'>
              { this.props.patrBalance }
            </div>
          </div>
          <br/>
          <div className='row'>
            <div className='col-m mr-1'>
              Send:
            </div>
            <div className='col-m'>
              { '0.0000' } PTR
            </div>
            <div className='input-group mb-3'>
              <input type='text' className='form-control' placeholder={ '0.0000' }  aria-label='Amount (to the nearest dollar)' onChange={ this.updateTransferQuantity } />
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
              { 'someaccount' }
            </div>
          </div>
          <div className='row'>
            <div className='col-m input-group mb-3'>
              <input className='form-control' type='text' size='12' placeholder='Receiver Account' onChange={ this.updateReceiverAccount } />
            </div>
            <button className='btn btn-patreos' onClick={ () => this.sendPatreosToken() }>Send Transaction</button>
          </div>
        </div>
        <div className='container rounded p-5 col-xs-6 col-lg-4 border border-patreos bg-light mb-3'>
          <div className='row'>
            <div className='col-m'>
              <h3>Staking</h3>
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
              <h3>Pledging</h3>
            </div>
          </div>
          <br/>
          <div className='row'>
            <div className='col-m mr-1'>
              Quantity to Pledge:
            </div>
            <div className='col-m'>
              { '0.0000' } PTR
            </div>
          </div>
          <div className='row'>
            <div className='col-m input-group mb-3'>
              <input className='form-control' type='text' size='12' placeholder='Pledge to Account' onChange={ this.updateReceiverAccount } />
            </div>
            <button className='btn btn-patreos' onClick={ () => this.pledgePatreos() }>Pledge</button>
          </div>
          <div className='row'>
            <div id="pledge-list" className='col-m'></div>
          </div>
        </div>
      </div>
    );
  }

  updateTransferQuantity = (input) => {
    //this.props.tokenActions.updateTransferQuantity(input.target.value);
  };

  updateReceiverAccount = (input) => {
    //this.props.tokenActions.updateReceiverAccount(input.target.value);
  };

  updateStakeAmt = (input) => {
    this.props.patreosActions.updateStakeAmt(input.target.value);
  };

  updateUnstakeAmt = (input) => {
    this.props.patreosActions.updateUnstakeAmt(input.target.value);
  };

  sendPatreosToken = () => {
    const receiverAccount = this.props.tokenInfo.receiverAccount;
    if(receiverAccount == '') {
      alert('receiver account cannot be blank');
      return;
    }

    const transaction = this.transaction_builder.transfer(this.props.account,
      receiverAccount, '1.0000', '<3',
      this.config.code.patreostoken, this.config.patreosSymbol);
    this.props.scatterEos.transaction(transaction);
  };

  stakePatreos = () => {
    const transaction = this.transaction_builder.stake(this.props.eosAccountStr, this.props.patreosReducer.stakeAmt);
    this.props.scatterEos.transaction(transaction);
  };

  unstakePatreos = () => {
    const transaction = this.transaction_builder.unstake(this.props.eosAccountStr, this.props.patreosReducer.unstakeAmt);
    this.props.scatterEos.transaction(transaction);
  };

  pledgePatreos = () => {
    var regex = /^0.0000 PATR$/g;
    var emptyVaultBalance = false;
    for (var i in this.props.vaultInfo) {
      var ret = this.props.vaultInfo[i].match(regex);
      console.log(ret);
      if(ret) {
        emptyVaultBalance = true;
      }
    }
    if(emptyVaultBalance) {
      this.emptyVaultPledgePatreos()
    } else {
      this.vaultBalancePledgePatreos()
    }
  };

  vaultBalancePledgePatreos = () => {
    const transaction = this.transaction_builder.pledge(this.props.account, this.props.tokenInfo.receiverAccount, '50.0000', 1);
    this.props.scatterEos.transaction(transaction);
  };

  emptyVaultPledgePatreos = () => {
    const transaction = this.transaction_builder.emptyVaultPledge(this.props.account, this.props.tokenInfo.receiverAccount, '50.0000', 'PLEDGE <3', 'patreostoken', 'PATR')
    this.props.scatterEos.transaction(transaction);
  };

  unpledgePatreosAccount = (account) => {
  const transaction = this.transaction_builder.unpledge(this.props.account, account);
  this.props.scatterEos.transaction(transaction);
  }

  unpledgePatreos = () => {
    const transaction = this.transaction_builder.unpledge(this.props.account, this.props.tokenInfo.receiverAccount);
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

  updatePledgeDom = (pledges) => {
    if(pledges == null) {
      return;
    }
    var indents = [];
    for (var i = 0; i < pledges.length; i++) {
      let boundItemClick = this.unpledgePatreosAccount.bind(this, pledges[i]['creator']);
      indents.push(
        <div className='row' key={i}>
          <span className='col' key={4*i + 1}>Creator: {pledges[i]['creator']}</span>
          <span className='col' key={4*i + 2}>Pledge: {pledges[i]['quantity']}</span>
          <span className='col' key={4*i + 3}>Days: {pledges[i]['seconds']}</span>
          <button type="button" className="col close" aria-label="Close" key={4*i + 4} onClick={ boundItemClick } >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      );
    }

    ReactDOM.render(indents, document.getElementById('pledge-list'));
  }

  getPledges = () => {
    const table = this.props.eos.getTableRows(true, this.config.code.patreosnexus, this.props.account, 'pledges')
    table.then((response) => {
      if(response.rows.length > 0) {
        // TODO: Better way to compare this objects
        if(JSON.stringify(this.props.tokenInfo.pledges) != JSON.stringify(response.rows)) {
          this.props.tokenActions.updatePledges(response.rows);
        }
        return;
      }
      this.props.tokenActions.updatePledges([]);
    }).catch(error => {
      console.log('An error occurred: ' + JSON.stringify(error)); //eslint-disable-line
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
