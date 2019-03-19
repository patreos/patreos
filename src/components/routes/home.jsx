import React from 'react';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';

import logo from '../../../public/img/patreos-logo.svg';
import hero from '../../../public/img/hero.svg';
import icnPatreos from '../../../public/img/icn-patreos.svg';

import britt from '../../../public/img/headshot-britt.png';
import britt2 from '../../../public/img/headshot-britt@2x.jpg';
import jordan from '../../../public/img/headshot-jordan.jpg';
import jordan2 from '../../../public/img/headshot-jordan@2x.jpg';
import kat from '../../../public/img/headshot-kat.jpg';
import kat2 from '../../../public/img/headshot-kat@2x.jpg';
import mike from '../../../public/img/headshot-mike.jpg';
import mike2 from '../../../public/img/headshot-mike@2x.jpg';

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
                <a href="/whitepaper/patreos_whitepaper_1_30_19.pdf" className="btn btn-whitepaper btn-lg" role="button">Read the Whitepaper</a>
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
        <div className="container patr-team">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <h2 className="text-center">Meet Our Team</h2>
              <p className="text-center mb-5 lead">Say Hi! To the people who make Patreos possible.</p>
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="mx-3 patr-headshot border rounded mb-5">
              <div className="overlay rounded"></div>
              <img src={ britt } srcSet={`${ britt } 1x, ${ britt2 } 2x`} className="image-fluid rounded" />
              <div className="info rounded">
                <i className="fas fa-ellipsis-h viewinfo"></i>
                <div className="name">Britt Kim</div>
                <div className="title">@okayplanet</div>
                <div className="bio mt-2">
                  Britt is a Y Combinator alumnus and co-founder of DataRank (acquired by Simply Measured, Inc in 2015). He is a computer programmer and has been working with blockchain technologies since 2013.
                </div>
              </div>
            </div>
            <div className="mx-3 patr-headshot border rounded mb-5">
              <div className="overlay rounded"></div>
              <img src={ jordan } srcSet={`${ jordan } 1x, ${ jordan2 } 2x`} className="image-fluid rounded" />
              <div className="info rounded">
                <i className="fas fa-ellipsis-h viewinfo"></i>
                <div className="name">Jordan Carsile</div>
                <div className="title">@jordantcarlisle</div>
                <div className="bio mt-2">
                  Jordan Carlisle is a startup strategist and entrepreneurial community builder. In 2015 he co-founded Strengthen Labs, which uses evidence based practices to build behavioral change software. He leaped into crypto in 2013.
                </div>
              </div>
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="mx-3 patr-headshot border rounded mb-5">
              <div className="overlay rounded"></div>
              <img src={ kat } srcSet={`${ kat } 1x, ${ kat2 } 2x`} className="image-fluid rounded" />
              <div className="info rounded">
                <i className="fas fa-ellipsis-h viewinfo"></i>
                <div className="name">Kathryn Gadberry</div>
                <div className="title">@kgadberry91</div>
                <div className="bio mt-2">
                  Kat is the founder of Distributed Tech Partners, a blockchain and cryptocurrency consultancy. She is also finishing up a Master's Degree in Digital Currency from the University of Nicosia, while maintaining her current job in the data science field.
                </div>
              </div>
            </div>
            <div className="mx-3 patr-headshot border rounded mb-5">
              <div className="overlay rounded"></div>
              <img src={ mike } srcSet={`${ mike } 1x, ${ mike2 } 2x`} className="image-fluid rounded" />
              <div className="info rounded">
                <i className="fas fa-ellipsis-h viewinfo"></i>
                <div className="name">Michael Oh</div>
                <div className="title">@michaeloh2014</div>
                <div className="bio mt-2">
                  Before geeking out on crypto economics and designing tokens for cool projects (see Bucket Technologies), Michael was an international economist with the U.S. Treasury. He received his A.B. from Harvard and M.B.A. from MIT Sloan.
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
}

function mapDispatchToProps(dispatch) {
  return {};
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
