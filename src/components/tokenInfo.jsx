import React from 'react';
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
    this.getPTRBalance();
    this.getStakedPTRBalance();
    this.getPledges()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.account !== this.props.account) {
      //this.tokeInfoUpdate();
    }
  }

  componentDidMount() {
    //this.interval = setInterval(() => this.tokeInfoUpdate(), 3000);
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
        <div className="jumbotron">
          <h1>PTR Management</h1>
          <p>This example is a quick exercise to illustrate how the default, static navbar and fixed to top navbar work. It includes the responsive CSS and HTML, so it also adapts to your viewport and device.</p>
          <p>
            <a className="btn btn-lg btn-primary" href="#navbar" role="button">Manage with Scatter</a>
          </p>
        </div>
        <div className="container m-5">
          <div className="row">
            <div className="col-m">
              <b>Patreos Token Transfers</b>
            </div>
          </div>
          <div className="row">
            <div className="col-m">
              PTR Balance:
            </div>
            <div className="col-m">
              { unstakedBalance }
            </div>
          </div>
          <br/>
          <div className="row">
            <div className="col-m">
              Send:
            </div>
            <div className="col-m">
              { transferQuantity } PTR
            </div>
          </div>
          <div className="row">
            <div className="col-m">
              Receiver Account:
            </div>
            <div className="col-m">
              { receiverAccount }
            </div>
          </div>
          <div className="row">
            <div className="col-m">
              <input type="text" size="12" placeholder="Receiver Account" onChange={ this.updateReceiverAccount } />
              <button className="btn btn-primary" onClick={ () => this.sendPatreosToken() }>Send Transaction</button>
            </div>
          </div>
        </div>
        <div className="container m-5">
          <div className="row">
            <div className="col-m">
              <b>Patreos Token Staking</b>
            </div>
          </div>
          <div className="row">
            <div className="col-m">
              PTR Staked Balance:
            </div>
            <div className="col-m">
              { stakedBalance }
            </div>
          </div>
          <br/>
          <div className="row">
            <div className="col-m">
              Quantity to Stake:
            </div>
            <div className="col-m">
              { stakeQuantity } PTR
            </div>
          </div>
          <div className="row">
            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder={ stakeQuantity }  aria-label="Amount (to the nearest dollar)" onChange={ this.updateStakeQuantity } />
              <div className="input-group-append">
                <span className="input-group-text">PTR</span>
              </div>
            </div>
            <button className="btn btn-primary" onClick={ () => this.stakePatreos() }>Stake</button>
          </div>
          <br/>
          <div className="row">
            <div className="col-m">
              Quantity to Unstake:
            </div>
            <div className="col-m">
              { unstakeQuantity } PTR
            </div>
          </div>
          <div className="row">
            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder={ unstakeQuantity } aria-label="Amount (to the nearest dollar)" onChange={ this.updateUnstakeQuantity } />
              <div className="input-group-append">
                <span className="input-group-text">PTR</span>
              </div>
            </div>
            <button className="btn btn-primary" onClick={ () => this.unstakePatreos() }>Unstake</button>
          </div>
        </div>
        <div className="container m-5">
          <div className="row">
            <div className="col-m">
              <b>Patreos Token Pledging</b>
            </div>
          </div>
          <div className="row">
            <div className="col-m">
              Pledges:
            </div>
            <div className="col-m">
              { JSON.stringify(pledges) }
            </div>
          </div>
          <br/>
          <div className="row">
            <div className="col-m">
              Quantity to Pledge:
            </div>
            <div className="col-m">
              { pledgeQuantity } PTR
            </div>
          </div>
          <div className="row">
            <div className="col-m">
              <input type="text" size="12" placeholder="Pledge to Account" onChange={ this.updateReceiverAccount } />
            </div>
            <div className="col-m">
              <button className="btn btn-primary" onClick={ () => this.pledgePatreos() }>Pledge</button>
            </div>
          </div>
          <br/>
          <div className="row">
            <div className="col-m">
              Unpledge:
            </div>
          </div>
          <div className="row">
            <div className="col-m">
              <input type="text" size="12" placeholder="Unpledge from Account" onChange={ this.updateReceiverAccount } />
            </div>
            <div className="col-m">
              <button className="btn btn-primary" onClick={ () => this.unpledgePatreos() }>Unpledge</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
    const table = this.eos.getTableRows(true, this.config.code.patreostoken, this.props.account, 'stakedaccs')
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

  getPledges = () => {
    const table = this.eos.getTableRows(true, this.config.code.patreosnexus, this.props.account, 'pledges')
    table.then((response) => {
      if(response.rows.length > 0) {
        this.props.tokenActions.updatePledges(response.rows);
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
