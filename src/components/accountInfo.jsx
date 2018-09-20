import React from 'react';
import {bindActionCreators} from 'redux';
import * as ACCOUNT_ACTIONS from '../actions/account_actions';
import connect from 'react-redux/es/connect/connect';

class AccountInfo extends React.Component {
  render() {
    const { userName, userInfo, webSite, scatterDetected } = this.props.accountInfo;
    return (
      <div className='account-container'>
        <div className='container m-5'>
          <div className='row'>
            <div className='col-m'>
              Scatter:
            </div>
            <div className='col-m'>
              { scatterDetected }
            </div>
          </div>
          <div className='row'>
            <div className='col-m'>
              Account:
            </div>
            <div className='col-m'>
              <a href={webSite} target='_blank'>{userName}</a>
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
