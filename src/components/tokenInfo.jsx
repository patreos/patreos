import React from 'react';
import ReactDOM from 'react-dom';
import {bindActionCreators} from 'redux';
import * as PATREOS_TOKEN_ACTIONS from '../actions/token_actions';
import connect from 'react-redux/es/connect/connect';
import Eos from 'eosjs';
import config from 'react-global-configuration';
import TransactionBuilder from '../utils/transaction_builder';

class TokenInfo extends React.Component {

  constructor(props) {
    super(props);
    this.config = this.props.config;
    this.eos = Eos({...this.config.eos});
  }

  tokeInfoUpdate() {
    if(this.props.scatter != null) {
      this.getPTRBalance();
      this.getStakedPTRBalance();
      this.getPledges();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.account !== this.props.account) {
      this.tokeInfoUpdate();
    }
    if (prevProps.tokenInfo.pledges !== this.props.tokenInfo.pledges) {
      this.updatePledgeDom(this.props.tokenInfo.pledges);
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tokeInfoUpdate(), 3000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    // Found in reducers/token
    const { unstakedBalance, stakedBalance, receiverAccount, transferQuantity,
      stakeQuantity, unstakeQuantity, pledgeQuantity, pledgeCycleDays, pledges } = this.props.tokenInfo;

    return (
      <div className='token-container'>
        <div className='container bg-light rounded p-5 col-xs-6 col-lg-4 border border-patreos bg-light mb-3'>
          <div className='row'>
            <div className='col-m'>
              <h3>Send</h3>
            </div>
          </div>
          <div className='row'>
            <div className='col-m'>
              Unstaked Balance:
            </div>
            <div className='col-m'>
              { unstakedBalance }
            </div>
          </div>
          <br/>
          <div className='row'>
            <div className='col-m'>
              Send:
            </div>
            <div className='col-m'>
              { transferQuantity } PTR
            </div>
            <div className='input-group mb-3'>
              <input type='text' className='form-control' placeholder={ transferQuantity }  aria-label='Amount (to the nearest dollar)' onChange={ this.updateTransferQuantity } />
              <div className='input-group-append'>
                <span className='input-group-text'>PTR</span>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-m'>
              Receiver Account:
            </div>
            <div className='col-m'>
              { receiverAccount }
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
            <div className='col-m'>
              PTR Staked Balance:
            </div>
            <div className='col-m'>
              { stakedBalance }
            </div>
          </div>
          <br/>
          <div className='row'>
            <div className='col-m'>
              Quantity to Stake:
            </div>
            <div className='col-m'>
              { stakeQuantity } PTR
            </div>
          </div>
          <div className='row'>
            <div className='input-group mb-3'>
              <input type='text' className='form-control' placeholder={ stakeQuantity }  aria-label='Amount (to the nearest dollar)' onChange={ this.updateStakeQuantity } />
              <div className='input-group-append'>
                <span className='input-group-text'>PTR</span>
              </div>
            </div>
            <button className='btn btn-patreos' onClick={ () => this.stakePatreos() }>Stake</button>
          </div>
          <br/>
          <div className='row'>
            <div className='col-m'>
              Quantity to Unstake:
            </div>
            <div className='col-m'>
              { unstakeQuantity } PTR
            </div>
          </div>
          <div className='row'>
            <div className='input-group mb-3'>
              <input type='text' className='form-control' placeholder={ unstakeQuantity } aria-label='Amount (to the nearest dollar)' onChange={ this.updateUnstakeQuantity } />
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
            <div className='col-m'>
              Quantity to Pledge:
            </div>
            <div className='col-m'>
              { pledgeQuantity } PTR
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
    this.props.tokenActions.updateTransferQuantity(input.target.value);
  };

  updateReceiverAccount = (input) => {
    this.props.tokenActions.updateReceiverAccount(input.target.value);
  };

  updateStakeQuantity = (input) => {
    this.props.tokenActions.updateStakeQuantity(input.target.value);
  };

  updateUnstakeQuantity = (input) => {
    this.props.tokenActions.updateUnstakeQuantity(input.target.value);
  };

  sendPatreosToken = () => {
    const receiverAccount = this.props.tokenInfo.receiverAccount;
    if(receiverAccount == '') {
      alert('receiver account cannot be blank');
      return;
    }
    const network = this.config.requiredFields.accounts[0];

    // TODO: Check that passing scatter prop is best approach
    const scatter = this.props.scatter;

    const eos = scatter.eos(network, Eos, {});
    const transaction_builder = new TransactionBuilder(this.config);
    const transaction = transaction_builder.transfer(this.props.account,
      receiverAccount, '1.0000', '<3',
      this.config.code.patreostoken, this.config.patreosSymbol);
    eos.transaction(transaction);
  };

  stakePatreos = () => {
    const network = this.config.requiredFields.accounts[0];

    // TODO: Check that passing scatter prop is best approach
    const scatter = this.props.scatter;

    const eos = scatter.eos(network, Eos, {});
    const transaction_builder = new TransactionBuilder(this.config);
    const transaction = transaction_builder.stake(this.props.account, '1.0000', '<3');
    eos.transaction(transaction);
  };

  unstakePatreos = () => {
    const network = this.config.requiredFields.accounts[0];

    // TODO: Check that passing scatter prop is best approach
    const scatter = this.props.scatter;

    const eos = scatter.eos(network, Eos, {});
    const transaction_builder = new TransactionBuilder(this.config);
    const transaction = transaction_builder.unstake(this.props.account, '1.0000', '<3');
    eos.transaction(transaction);
  };

  pledgePatreos = () => {
    const network = this.config.requiredFields.accounts[0];

    // TODO: Check that passing scatter prop is best approach
    const scatter = this.props.scatter;

    const eos = scatter.eos(network, Eos, {});
    const transaction_builder = new TransactionBuilder(this.config);
    const transaction = transaction_builder.pledge(this.props.account, this.props.tokenInfo.receiverAccount, '1.0000', 1);
    eos.transaction(transaction);
  };

  unpledgePatreosAccount = (account) => {
  const network = this.config.requiredFields.accounts[0];

  // TODO: Check that passing scatter prop is best approach
  const scatter = this.props.scatter;

  const eos = scatter.eos(network, Eos, {});
  const transaction_builder = new TransactionBuilder(this.config);
  const transaction = transaction_builder.unpledge(this.props.account, account);
  eos.transaction(transaction);
  }

  unpledgePatreos = () => {
    const network = this.config.requiredFields.accounts[0];

    // TODO: Check that passing scatter prop is best approach
    const scatter = this.props.scatter;

    const eos = scatter.eos(network, Eos, {});
    const transaction_builder = new TransactionBuilder(this.config);
    const transaction = transaction_builder.unpledge(this.props.account, this.props.tokenInfo.receiverAccount);
    eos.transaction(transaction);
  };

  getPTRBalance = () => {
    const patreosBalance = this.eos.getCurrencyBalance(this.config.code.patreostoken,
      this.props.account, this.config.patreosSymbol)
    patreosBalance.then((response) => {
      this.props.tokenActions.updateUnstakedBalance(response[0]);
    }).catch(error => {
      console.log('An error occurred: ' + JSON.stringify(error)); //eslint-disable-line
    });
  };

  getStakedPTRBalance = () => {
    const table = this.eos.getTableRows(true, this.config.code.patreostoken, this.props.account, 'liquidstake')
    table.then((response) => {
      if(response.rows.length > 0) {
        this.props.tokenActions.updateStakedBalance(response.rows[0].balance);
        return;
      }
      this.props.tokenActions.updateStakedBalance('0.0000 PTR');
    }).catch(error => {
      console.log('An error occurred: ' + JSON.stringify(error)); //eslint-disable-line
    });
  };

  updatePledgeDom = (pledges) => {
    if(pledges == null) {
      return;
    }
    var indents = [];
    for (var i = 0; i < pledges.length; i++) {
      let boundItemClick = this.unpledgePatreosAccount.bind(this, pledges[i]['to']);
      indents.push(
        <div className='row' key={i}>
          <span className='col' key={4*i + 1}>Creator: {pledges[i]['to']}</span>
          <span className='col' key={4*i + 2}>Pledge: {pledges[i]['quantity']}</span>
          <span className='col' key={4*i + 3}>Days: {pledges[i]['days']}</span>
          <button type="button" className="col close" aria-label="Close" key={4*i + 4} onClick={ boundItemClick } >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      );
    }

    ReactDOM.render(indents, document.getElementById('pledge-list'));
  }

  getPledges = () => {
    const table = this.eos.getTableRows(true, this.config.code.patreosnexus, this.props.account, 'pledges')
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
    tokenActions: bindActionCreators(PATREOS_TOKEN_ACTIONS, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    tokenInfo: state.tokenInfo
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TokenInfo);
