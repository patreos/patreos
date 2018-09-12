import React from 'react';
import {bindActionCreators} from 'redux';
import * as ACCOUNT_ACTIONS from '../actions/account_actions';
import connect from 'react-redux/es/connect/connect';

class AccountInfo extends React.Component {
  render() {
    const { userName, userInfo, webSite, scatterDetected } = this.props.accountInfo;
    return (
      <div className='account-container'>
        <ul className='account-info'>
          <li>Status: {scatterDetected }</li>
          <li>
            <span>EOS Account: </span>
            <a href={webSite} target='_blank'>{userName}</a>
          </li>
        </ul>
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
