import React from 'react';
import {bindActionCreators} from 'redux';
import * as UI_ACTIONS from '../actions/ui_actions';
import connect from 'react-redux/es/connect/connect';

class AccountInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { userInfo, webSite, scatterDetected } = this.props.ui;
    return (
      <div className='account-container'>
        <ul className='account-info'>
          <li>
            <span>Username: </span>
            <a href={webSite} target='_blank'>{userInfo.account_name}</a>
          </li>
          <li>User Info: {JSON.stringify(userInfo)}</li>
          <li>Status: {scatterDetected}</li>
        </ul>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    uiActions: bindActionCreators(UI_ACTIONS, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    ui: state.ui
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo);
