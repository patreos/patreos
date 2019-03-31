import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import Eos from 'eosjs';
import config from 'react-global-configuration';
import ReactTooltip from 'react-tooltip'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor'

import * as PATREOS_ACTIONS from '../../../actions/patreos_actions';

import TransactionBuilder from '../../../utils/transaction_builder';
import EosReader from '../../../utils/eos_reader'

import logo from '../../../../public/img/patreos-logo.svg';
import hero from '../../../../public/img/hero.svg';
import icnPatreos from '../../../../public/img/icn-patreos.svg';

class Header extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.parent) {
        return <div />
    }
    const isConnectedToScatterBool = this.props.scatterDetectionStr == 'true';
    let conditionalLoginHeaderDom;

    if (isConnectedToScatterBool) {
      conditionalLoginHeaderDom = (
        <div className="row mt-5">
          <div className="col">How it works</div>
          <div className="col">FAQ</div>
          <div className="col">
            <button onClick={ () => this.props.parent.scatterHelper.disconnectScatter() } role="button" className="btn btn-primary btn-sm btn-block">Log Out</button>
          </div>
        </div>
      );
    } else {
      conditionalLoginHeaderDom = (
        <div className="row mt-5">
          <div className="col">How it works</div>
          <div className="col">FAQ</div>
          <div className="col">
            <button onClick={ () => this.props.parent.scatterHelper.connectScatter( () => { this.props.parent.updateComponentData() } ) } role="button" className="btn btn-primary btn-sm btn-block">Log In</button>
          </div>
        </div>
      );
    }

    return (
      <div className="row">
        <div className="col-md-6">
          <a href="/" className="d-inline-block">
            <img src={ logo } className="my-5" />
          </a>
        </div>
        <div className="col-md-6">
          {conditionalLoginHeaderDom}
        </div>
      </div>
    );
  }

}

function mapDispatchToProps(dispatch) {
  return {};
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
