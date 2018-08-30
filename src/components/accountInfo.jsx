import React from 'react';
import {bindActionCreators} from 'redux';
import * as UI_ACTIONS from '../actions/ui_actions';
import connect from 'react-redux/es/connect/connect';

class AccountInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { userName, userInfo, webSite, scatterDetected } = this.props.ui;
    return (
      <div className="wrapper">
        <label>User - <a href={webSite} target="_blank">{userName}</a></label>
        <br/>
        <label>User Info - <div>{userInfo}</div></label>
        <br/>
        <div className="scatter">{scatterDetected}</div>
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
