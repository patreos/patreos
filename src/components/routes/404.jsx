import React from 'react';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';

import logo from '../../../public/img/patreos-logo.svg';
import hero from '../../../public/img/hero.svg';
import icnPatreos from '../../../public/img/icn-patreos.svg';

class PageNotFound extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <main role="main">
        <div className="container">
          <div className="row">
            <div className="col-md-6 pr-5 mb-5">
              <a href="/" className="d-inline-block">
                <img src={logo} className="my-5" />
              </a>
              <h1>Alas, we looked but couldn't find this page.</h1>
              <p className="lead mb-5 mt-3">We hope this 404 doesn't damage our relationship.</p>
            </div>
            <div className="col-md-6">
              <img src={hero} width="100%" height="100%" className="d-none d-md-block" />
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
}

function mapDispatchToProps(dispatch) {
  return {};
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(PageNotFound);
