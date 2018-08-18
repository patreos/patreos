import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as UI_ACTIONS from './actions/ui_actions';
import './styles/index.scss';
import Eos from 'eosjs';
import config from 'react-global-configuration';
import configuration from './config/config';
config.set(configuration);

class App extends React.Component {

  constructor(props) {
    super(props)
    this.appConfig = config.get(process.env["ENV_VAR"]);
  }

  componentDidMount() {
    console.log(process.env["APP_MESSAGE"])
    this.props.uiActions.detectScatter('LOOKING FOR SCATTER');
    let eos = Eos(Object.assign({}, this.appConfig.eos));

    setTimeout(
      function() {
        if(typeof(scatter)=='undefined') {
          this.props.uiActions.detectScatter('SCATTER NOT INSTALLED');
        }
      }
        .bind(this),
      2000
    );

    document.addEventListener('scatterLoaded', (e) => {
      // Scatter will now be available from the window scope.
      // At this stage the connection to Scatter from the application is
      // already encrypted.
      const scatter = window.scatter;
      console.log(e); // eslint-disable-line

      // It is good practice to take this off the window once you have
      // a reference to it.
      window.scatter = null;

      if(scatter != null) {
        this.props.uiActions.detectScatter('SCATTER DETECTED');
      }
    });

    //let eosConfig = getEosConfig();
    //let eos = Eos(localConfig.eos);

    let myaccount = eos.getAccount(this.appConfig.testAccount);
    myaccount.then((successMessage) => {
      this.props.uiActions.updateUserInfo(JSON.stringify(successMessage));
      this.props.uiActions.updateName(successMessage.account_name);
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
