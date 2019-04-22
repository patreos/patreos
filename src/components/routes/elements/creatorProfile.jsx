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


class CreatorProfile extends React.Component {

  constructor(props) {
    super(props);
    this.config = this.props.config;
    this.transactionBuilder = new TransactionBuilder(this.config);
    this.eosReader = new EosReader(this.props.eos);
    this.scatterHelper = this.props.scatterHelper;
  }

  updateComponentData() {
    if(Object.keys(this.props.scatterEos).length > 0 && this.scatterHelper.getScatterIdentity()) {
      if(this.props.eosAccountStr) {
        this.getCreatorProfile();
      }
    }
  }

  componentDidUpdate(prevProps) {
    if(this.props.creatorReducer.creatorNameStr == '' && this.props.creatorReducer.creatorCurrentNameStr != '') {
      this.props.creatorActions.updateCreatorNameStr(this.props.creatorReducer.creatorCurrentNameStr);
    }
    if(this.props.creatorReducer.creatorDescriptionStr == '' && this.props.creatorReducer.creatorCurrentDescriptionStr != '') {
      this.props.creatorActions.updateCreatorDescriptionStr(this.props.creatorReducer.creatorCurrentDescriptionStr);
    }
    if(this.props.creatorReducer.creatorImageStr == '' && this.props.creatorReducer.creatorCurrentImageStr != '') {
      this.props.creatorActions.updateCreatorImageStr(this.props.creatorReducer.creatorCurrentImageStr);
    }
    if(this.props.creatorReducer.creatorBannerStr == '' && this.props.creatorReducer.creatorCurrentBannerStr != '') {
      this.props.creatorActions.updateCreatorBannerStr(this.props.creatorReducer.creatorCurrentBannerStr);
    }
    if (prevProps.eosAccountStr !== this.props.eosAccountStr) {
      this.updateComponentData();
    }
  }

  componentWillMount() {
    //this.props.patreosActions.updateStakedBalanceAmt('0.0000 PATR');
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
      creatorNameStr,
      creatorDescriptionStr,
      creatorBannerStr,
      creatorImageStr,
      creatorPublicationTitleStr,
      creatorPublicationDescriptionStr,
      creatorPublicationUrlStr,
      creatorPublicationImageStr
    } = this.props.creatorReducer;

    return (
      <main role="main">
        <div className='container'>
          <Header {...this.props} scatterDetectionStr={ this.props.scatterDetectionStr } parent={this} />

          <div className='container rounded p-5 col-xs-6 col-lg-4 border border-patreos bg-light mb-3'>
            <div className='row'>
              <div className='col-m'>
                <h3>Set Creator Profile</h3>
              </div>
            </div>
            <div className='row'>
              <div className='col-m mr-1'>
                Creator Name:
              </div>
              <div className='col-m'>
                { creatorNameStr }
              </div>
              <input type='text' className='form-control' placeholder={ creatorNameStr }  aria-label='' onChange={ this.updateCreatorNameStr } />
            </div>
            <br/>
            <div className='row'>
              <div className='col-m mr-1'>
                Creator Description:
              </div>
              <div className='col-m'>
                { creatorDescriptionStr }
              </div>
              <input type='text' className='form-control' placeholder={ creatorDescriptionStr }  aria-label='' onChange={ this.updateCreatorDescriptionStr } />
            </div>
            <br/>
            <div className='row'>
              <div className='col-m mr-1'>
                Creator Banner URL:
              </div>
              <div className='col-m'>
                { creatorBannerStr }
              </div>
              <input type='text' className='form-control' placeholder={ creatorBannerStr }  aria-label='' onChange={ this.updateCreatorBannerStr } />
            </div>
            <br/>
            <div className='row'>
              <div className='col-m mr-1'>
                Creator Image URL:
              </div>
              <div className='col-m'>
                { creatorImageStr }
              </div>
              <input type='text' className='form-control' placeholder={ creatorImageStr }  aria-label='' onChange={ this.updateCreatorImageStr } />
            </div>
            <br/>
            <button className='btn btn-patreos' onClick={ () => this.setProfile() }>Set Profile</button>
          </div>
          <div className='container rounded p-5 col-xs-6 col-lg-4 border border-patreos bg-light mb-3'>
            <div className='row'>
              <div className='col-m mr-1'>
                Profile:
              </div>
            </div>
            <br/>
            <div className='row'>
              <img src={ creatorBannerStr } alt="Banner" height="200" width="400"/>
            </div>
            <br/>
            <div className='row'>
              <div className='col-m'>
                { creatorNameStr }
              </div>
            </div>
            <br/>
            <div className='row'>
              <div className='col-m'>
                { creatorDescriptionStr }
              </div>
            </div>
            <br/>
            <div className='row'>
              <img src={ creatorImageStr } alt="Image" height="42" width="42"/>
            </div>
          </div>
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

  updateCreatorNameStr = (input) => this.props.creatorActions.updateCreatorNameStr(input.target.value);
  updateCreatorDescriptionStr = (input) => this.props.creatorActions.updateCreatorDescriptionStr(input.target.value);
  updateCreatorBannerStr = (input) => this.props.creatorActions.updateCreatorBannerStr(input.target.value);
  updateCreatorImageStr = (input) => this.props.creatorActions.updateCreatorImageStr(input.target.value);

  setProfile = () => {
    const transaction = this.transactionBuilder.set_profile(
      this.props.eosAccountStr,
      this.props.creatorReducer.creatorNameStr,
      this.props.creatorReducer.creatorDescriptionStr,
      this.props.creatorReducer.creatorImageStr,
      this.props.creatorReducer.creatorBannerStr,
      [ { service: "twitter", profile_url: "https://twitter.com/PatreosDapp"} ]
    );
    this.props.scatterEos.transaction(transaction);
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
          this.props.creatorActions.updateCreatorCurrentNameStr(val[0].name);
          this.props.creatorActions.updateCreatorCurrentDescriptionStr(val[0].description);
          this.props.creatorActions.updateCreatorCurrentBannerStr(val[0].banner_url);
          this.props.creatorActions.updateCreatorCurrentImageStr(val[0].image_url);
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

export default connect(mapStateToProps, mapDispatchToProps)(CreatorProfile);
