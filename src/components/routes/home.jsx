import React from 'react';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';

import logo from '../../../public/img/patreos-logo.svg';
import hero from '../../../public/img/hero.svg';
import icnPatreos from '../../../public/img/icn-patreos.svg';

class Home extends React.Component {

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
              <h1>Support The Content Creators You Love, Not The Platform They Use.</h1>
              <p className="lead mb-5 mt-3">With Patreos, you support the content you love -- not the platform creators use. Share, subscribe and fund creators and campaigns to promote community growth and creative freedom.</p>
              <h5 className="mb-4">Check your balance to find out if your received PATR in airdrop! </h5>
              <a href="/patr" className="btn btn-primary btn-lg" role="button">Check your PATR balance</a>
            </div>
            <div className="col-md-6">
              <img src={hero} width="100%" height="100%" className="d-none d-md-block" />
            </div>
          </div>
        </div>
        <div className="jumbotron jumbotron-fluid patr-social-banner">
          <div className="container">
            <div className="row text-light">
              <div className="col-md-9">
                <h4 className="mb-3">Bummed you missed our airdrop? Stay in the loop! </h4>
                <p className="lead mb-3">Join the community and we’ll keep you posted about new opportunities to earn PATR.</p>
                <div className="patreos-email-signup mb-4">
                  <form action="https://patreos.us20.list-manage.com/subscribe/post?u=663c52e28e14a6699086b4828&amp;id=00065a0223" method="post" target="_blank">
                    <div className="row">
                      <div className="col-lg mb-2">
                        <input type="email" className="form-control input-big-text" required="required" name="EMAIL" id="mce-EMAIL" placeholder="@ Your Email" />
                      </div>
                      <div className="col-sm">
                        <button type="submit" className="btn btn-whitepaper btn-lg">
                          <i className="fa fa-envelope-o"></i>Inform Me
                        </button>
                      </div>
                    </div>
                    <div className="mailchimp" aria-hidden="true"><input type="text" name="b_97f1bc02efa56031b67a2b00f_fc7b4ce646" tabIndex="-1" readOnly="" /></div>
                  </form>
                </div>
                <p className="lead mb-1">Don't forget to checkout our whitepaper!</p>
                <a href="/whitepaper" className="btn btn-whitepaper btn-lg" role="button">Read the Whitepaper</a>
              </div>
            </div>
          </div>
        </div>
        <div className="container patr-benefits">
          <div className="row my-5">
            <div className="col-lg-6 offset-lg-3">
              <h2 className="text-center">Why Choose Patreos?</h2>
              <p className="text-center mb-5 lead">Patreos is a decentralized content ecosystem built on the EOS blockchain that powers content sharing, subscriptions, funding, and campaigns to promote community growth and creative freedom.</p>
              <h4 className="text-center">3 reasons to make the switch</h4>
            </div>
          </div>
          <div className="row">
            <div className="card-deck">
              <div className="card border-0 rounded-0">
                <div className="card-body mb-4">
                  <div className="card-image card-image-1 d-none d-md-block"></div>
                  <h5 className="card-title card-title">Creators First</h5>
                  <h6>Fortify your wallet</h6>
                  <p className="card-text">Unlike outmoded content platforms, Patreos doesn’t monetize your work. You can keep 100 percent of what you earn.</p>
                </div>
              </div>
              <div className="card border-0 rounded-0">
                <div className="card-body mb-4">
                  <div className="card-image card-image-2 d-none d-md-block"></div>
                  <h5 className="card-title">Promote Creativity</h5>
                  <h6>Support Great Content</h6>
                  <p className="card-text">Is there a writer or artist you wish to promote? Patreos helps you make sure their voice is heard. </p>
                </div>
              </div>
              <div className="card border-0 rounded-0">
                <div className="card-body mb-4">
                  <div className="card-image card-image-3 d-none d-md-block"></div>
                  <h5 className="card-title">Tell Your Story</h5>
                  <h6>Your story. Not Ours.</h6>
                  <p className="card-text">Patreos places a premium on creativity. Your work remains your work: unaltered, uncensored and undeniably yours.</p>
                </div>
              </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
