import React from 'react';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';

import * as CREATOR_ACTIONS from '../../../actions/creator_actions';

import EosReader from '../../../utils/eos_reader'
import TransactionBuilder from '../../../utils/transaction_builder';

class CreatorInfo extends React.Component {

  constructor(props) {
    super(props);
    this.config = this.props.config;
    this.eosReader = new EosReader(this.props.eos);
    this.transactionBuilder = new TransactionBuilder(this.config);
  }

  componentDidMount() {
    this.getCreatorProfile();
    this.interval = setInterval(() => this.getCreatorProfile(), this.config.updateInterval);
  }

  componentDidUpdate(prevProps) {
    // This means we got all info from app.js
    if (prevProps.scatterEos !== this.props.scatterEos) {
      this.getCreatorProfile();
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {
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
      <div className='creator-container'>

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
            <input type='text' className='form-control' placeholder={ creatorNameStr }  aria-label='Amount (to the nearest dollar)' onChange={ this.updateCreatorNameStr } />
          </div>
          <br/>
          <div className='row'>
            <div className='col-m mr-1'>
              Creator Description:
            </div>
            <div className='col-m'>
              { creatorDescriptionStr }
            </div>
            <input type='text' className='form-control' placeholder={ creatorDescriptionStr }  aria-label='Amount (to the nearest dollar)' onChange={ this.updateCreatorDescriptionStr } />
          </div>
          <br/>
          <div className='row'>
            <div className='col-m mr-1'>
              Creator Banner URL:
            </div>
            <div className='col-m'>
              { creatorBannerStr }
            </div>
            <input type='text' className='form-control' placeholder={ creatorBannerStr }  aria-label='Amount (to the nearest dollar)' onChange={ this.updateCreatorBannerStr } />
          </div>
          <br/>
          <div className='row'>
            <div className='col-m mr-1'>
              Creator Image URL:
            </div>
            <div className='col-m'>
              { creatorImageStr }
            </div>
            <input type='text' className='form-control' placeholder={ creatorImageStr }  aria-label='Amount (to the nearest dollar)' onChange={ this.updateCreatorImageStr } />
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
      this.props.creatorReducer.creatorBannerStr
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
          this.props.creatorActions.updateCreatorNameStr(val[0].name);
          this.props.creatorActions.updateCreatorDescriptionStr(val[0].description);
          this.props.creatorActions.updateCreatorBannerStr(val[0].banner_url);
          this.props.creatorActions.updateCreatorImageStr(val[0].image_url);
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

export default connect(mapStateToProps, mapDispatchToProps)(CreatorInfo);
