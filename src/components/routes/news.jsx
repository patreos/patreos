import React from 'react';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';

import logo from '../../../public/img/patreos-logo.svg';
import hero from '../../../public/img/hero.svg';
import icnPatreos from '../../../public/img/icn-patreos.svg';

class News extends React.Component {

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
              <h1>News</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 pr-5 mb-5">
              <h5 className="mb-4 mt-4">In the Eyes of a Blockchain Developer: Britt Kim From Patreos</h5>
              <p className="lead mb-3 mt-3">As a heavy Patreon user, I started noticing issues with the platform in early 2018. I knew a content platform would be perfect for blockchain...</p>
              <a href="https://www.dfuse.io/en/blog/in-the-eyes-of-a-blockchain-developer-britt-kim-from-patreos" className="btn btn-primary btn-md" target="_blank" role="button">Read more</a>
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className="col-md-6 pr-5 mb-5">
              <h5 className="mb-4 mt-4">How Blockchain Can — and Will — Liberate Content Creators</h5>
              <p className="lead mb-3 mt-3">Why do content creators agree to operate in such a cloud of uncertainty? Up until recently, they had little choice...</p>
              <a href="https://medium.com/@patreos/how-blockchain-can-and-will-liberate-content-creators-4740f216c4c1" className="btn btn-primary btn-md" target="_blank" role="button">Read more</a>
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className="col-md-6 pr-5 mb-5">
              <h5 className="mb-4 mt-4">Content Creators Are Getting Fleeced; Blockchain May Be the Answer</h5>
              <p className="lead mb-3 mt-3">The disparities inherent in today’s popular content platforms inspired Kim to launch Patreos, a blockchain-powered content platform...</p>
              <a href="https://www.starternoise.com/content-creators-are-getting-fleeced-blockchain-may-be-the-answer/" className="btn btn-primary btn-md" target="_blank" role="button">Read more</a>
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className="col-md-6 pr-5 mb-5">
              <h5 className="mb-4 mt-4">Patreos - EOS Decentralized Content Funding</h5>
              <p className="lead mb-3 mt-3">Supporting content through Patreos create no transaction fees for supporter contribution, censorship resistance and a great experience for supporters and creators...</p>
              <a href="https://www.theeoswriter.io/the-feed/2019/3/16/patreos-eos-decentralized-content-funding" className="btn btn-primary btn-md" target="_blank" role="button">Read more</a>
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className="col-md-6 pr-5 mb-5">
              <h5 className="mb-4 mt-4">Patreos Airdrops 1 Billion+ PATR Tokens; Relaunches Website</h5>
              <p className="lead mb-3 mt-3">More than 1 billion PATR tokens were automatically airdropped as of February 14, 2019 to the EOS holders who voted for the token last October...</p>
              <a href="https://www.prnewswire.com/news-releases/patreos-airdrops-1-billion-patr-tokens-relaunches-website-300797638.html" className="btn btn-primary btn-md" target="_blank" role="button">Read more</a>
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className="col-md-6 pr-5 mb-5">
              <h5 className="mb-4 mt-4">Should Content Creators Surrender 45% of Their Earnings?</h5>
              <p className="lead mb-3 mt-3">Today's top content outlets (YouTube, Facebook, etc.) utilize centralized, ad-based business models that are inefficient, forcing contributors to surrender...</p>
              <a href="https://www.marketwatch.com/press-release/should-content-creators-surrender-45-of-their-earnings-2019-01-31" className="btn btn-primary btn-md" target="_blank" role="button">Read more</a>
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

export default connect(mapStateToProps, mapDispatchToProps)(News);
