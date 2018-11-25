import React from 'react';
import {bindActionCreators} from 'redux';
import * as ACCOUNT_ACTIONS from '../actions/account_actions';
import connect from 'react-redux/es/connect/connect';

class AccountInfo extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.eosBalance !== this.props.eosBalance) {
      //console.log("Updated EOS Balance prop: " + this.props.eosBalance)
    }
    if (prevProps.patrBalance !== this.props.patrBalance) {
      //console.log("Updated PATR Balance prop: " + this.props.patrBalance)
    }
    if (prevProps.vaultInfo !== this.props.vaultInfo) {
      //console.log("Updated Vault Info prop: " + this.props.vaultInfo)
    }
  }

  render() {
    const {
      userName, userInfo, webSite, scatterDetected
    } = this.props.accountInfo;

    return (
      <div className='account-container'>
        <div className='container rounded p-5 col-xs-6 col-lg-4 border border-patreos bg-light mb-3'>
          <div className='row'>
            <div className='col-m mr-1'>
              Scatter:
            </div>
            <div className='col-m'>
              { scatterDetected }
            </div>
          </div>
          <br/>
          <div className='row'>
            <div className='col-m mr-1'>
              Account:
            </div>
            <div className='col-m'>
              <a href={ webSite } target='_blank'>{ userName }</a>
            </div>
          </div>
          <div className='row'>
            <div className='col-m mr-1'>
              EOS Balance:
            </div>
            <div className='col-m'>
              { this.props.eosBalance }
            </div>
          </div>
          <div className='row'>
            <div className='col-m mr-1'>
              PATR Balance:
            </div>
            <div className='col-m'>
              { this.props.patrBalance }
            </div>
          </div>
          <br/>
          <div className='row'>
            <div className='col-m mr-1'>
              Staked Balance in Vault:
            </div>
          </div>
          <div className='row'>
            <div className='col-m'>
              { this.props.vaultInfo.map((info, index) => <div key={ index }>{ info }</div>) }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    accountActions: bindActionCreators(ACCOUNT_ACTIONS, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    accountInfo: state.accountInfo
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo);
