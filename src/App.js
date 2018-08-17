import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as UI_ACTIONS from './actions/ui_actions';
import './styles/index.scss';
import Eos from 'eosjs';

class App extends React.Component {

  componentDidMount() {
    this.props.uiActions.detectScatter("LOOKING FOR SCATTER")

    setTimeout(
        function() {
          if(typeof(scatter)=="undefined") {
            this.props.uiActions.detectScatter("SCATTER NOT INSTALLED")
          }
        }
        .bind(this),
        2000
    );

    document.addEventListener('scatterLoaded', scatterExtension => {
        // Scatter will now be available from the window scope.
        // At this stage the connection to Scatter from the application is
        // already encrypted.
        const scatter = window.scatter;

        // It is good practice to take this off the window once you have
        // a reference to it.
        window.scatter = null;

        if(scatter != null) {
          this.props.uiActions.detectScatter("SCATTER DETECTED")
        }
    });

    let config = getEosConfig()
    let eos = Eos(config);

    let myaccount = eos.getAccount("myokayplanet");
    myaccount.then((successMessage) => {
      this.props.uiActions.updateUserInfo(JSON.stringify(successMessage))
      this.props.uiActions.updateName(successMessage.account_name)
    });
  }

  render() {
    const { userName, userInfo, count, webSite, scatterDetected } = this.props.ui;
    return (
      <div className="wrapper">
        <label>User - <a href={webSite} target="_blank">{userName}</a></label>
        <br />
        <label>User Info - <div>{userInfo}</div></label>
        <br />
        <div>
          Count is {count}
          <button onClick={this.props.uiActions.incrementCount}>INCREMENT COUNT</button>
        </div>
        <div className="scatter">{scatterDetected}</div>
      </div>
    );
  }

}

function getEosConfig() {
  return {
    httpEndpoint: 'https://mainnet.eoscanada.com',
    chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
    verbose: true
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
