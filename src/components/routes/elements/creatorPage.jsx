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

import * as CREATOR_ACTIONS from '../../../actions/creator_actions';

import TransactionBuilder from '../../../utils/transaction_builder';
import EosReader from '../../../utils/eos_reader'

import logo from '../../../../public/img/patreos-logo.svg';
import hero from '../../../../public/img/hero.svg';
import icnPatreos from '../../../../public/img/icn-patreos.svg';

import Header from './header';


class CreatorPage extends React.Component {

  constructor(props) {
    super(props);
    this.config = this.props.config;
    this.transactionBuilder = new TransactionBuilder(this.config);
    this.eosReader = new EosReader(this.props.eos);
    this.scatterHelper = this.props.scatterHelper;
  }

  updateComponentData() {
    if(this.props.eosAccountStr) {
      this.getCreatorProfile();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.eosAccountStr !== this.props.eosAccountStr) {
      this.updateComponentData();
    }
  }

  componentWillMount() {

  }

  componentDidMount() {
    this.updateComponentData();
    this.interval = setInterval(() => this.updateComponentData(), this.config.updateInterval);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {
      creatorCurrentNameStr,
      creatorCurrentDescriptionStr,
      creatorCurrentBannerStr,
      creatorCurrentImageStr,

      creatorPublicationTitleStr,
      creatorPublicationDescriptionStr,
      creatorPublicationUrlStr,
      creatorPublicationImageStr,

      creatorExists
    } = this.props.creatorReducer;

    let conditionalDom;

    if (this.props.creatorReducer.creatorExists) {
      conditionalDom = (
        <div className='container rounded p-5 col-xs-6 col-lg-4 border border-patreos bg-light mb-3'>
          <div className='row'>
            <div className='col-m mr-1'>
              Profile:
            </div>
          </div>
          <br/>
          <div className='row'>
            <img src={ creatorCurrentBannerStr } alt="Banner" height="200" width="400"/>
          </div>
          <br/>
          <div className='row'>
            <div className='col-m'>
              { creatorCurrentNameStr }
            </div>
          </div>
          <br/>
          <div className='row'>
            <div className='col-m'>
              { creatorCurrentDescriptionStr }
            </div>
          </div>
          <br/>
          <div className='row'>
            <img src={ creatorCurrentImageStr } alt="Image" height="42" width="42"/>
          </div>
        </div>
      );
    } else {
      conditionalDom = (
        <div className='container rounded p-5 col-xs-6 col-lg-4 border border-patreos bg-light mb-3'>
          User Does Not Exist.
        </div>
      );
    }

    return (
      <main role="main">
        <div className='container'>
          <Header {...this.props} scatterDetectionStr={ this.props.scatterDetectionStr } parent={this} />

          {conditionalDom}
        </div>
        <div className="container-fluid footer">
          <div className="row mt-5 py-5 mb-0">
            <div className="col text-center">
              <img src={icnPatreos} alt="" className="mb-5" />
              <ul className="list-inline">
                <li className="list-inline-item"><a href="mailto:hello@patreos.com">Contact</a></li>
                <li className="list-inline-item"><a href="mailto:press@patreos.com">Press</a></li>
                <li className="list-inline-item"><a href="/faq">FAQ</a></li>
                <li className="list-inline-item"><a href="/news">News</a></li>
                <li className="list-inline-item"><a href="https://t.me/patreos">Telegram</a></li>
                <li className="list-inline-item"><a href="https://twitter.com/PatreosDapp">Twitter</a></li>
              </ul>
              <p>All Rights Reserved, Patreos 2019</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  getCreatorProfile = () => {
    this.eosReader.getTable(
      {
        "json": true,
        "scope": this.config.code.patreosnexus,
        "code": this.config.code.patreosnexus,
        "table": 'profiles',
        "lower_bound": this.props.eosAccountStr,
        "limit": 1
      },
      (val) => {
        if(val.length > 0 && val[0].owner == this.props.eosAccountStr) {
          this.props.creatorActions.updateCreatorExists(true)
          this.props.creatorActions.updateCreatorCurrentNameStr(val[0].name);
          this.props.creatorActions.updateCreatorCurrentDescriptionStr(val[0].description);
          this.props.creatorActions.updateCreatorCurrentBannerStr(val[0].banner_url);
          this.props.creatorActions.updateCreatorCurrentImageStr(val[0].image_url);
        } else {
          this.props.creatorActions.updateCreatorExists(false)
        }
      }
    );
  };

}

function mapDispatchToProps(dispatch) {
  return {
    creatorActions: bindActionCreators(CREATOR_ACTIONS, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    creatorReducer: state.creatorReducer
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatorPage);
