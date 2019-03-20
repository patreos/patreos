import React from 'react';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';

import logo from '../../../public/img/patreos-logo.svg';
import hero from '../../../public/img/hero.svg';
import icnPatreos from '../../../public/img/icn-patreos.svg';

class Faq extends React.Component {

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
              <h1>FAQ</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 pr-5 mb-5">
              <h5 className="mb-4 mt-4">What is Patreos?</h5>
              <p className="lead mb-1 mt-3">Patreos is an ad-free, blockchain-based, decentralized content ecosystem enabling content sharing, subscriptions and campaigns to incentivize community growth and creative freedom. Although Patreos defaults to a fee-based service, it provides a fee-less option for users that hold the Patreos blockchain token. Learn more about Patreos.</p>
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className="col-md-6 pr-5 mb-5">
              <h5 className="mb-4 mt-4">Who Can Post Content on Patreos?</h5>
              <p className="lead mb-1 mt-3">All content creators are invited to share their work on Patreos:however, having an understanding of blockchain technology and cryptocurrencies will give creators a leg up when using the Patreos platform.</p>
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className="col-md-6 pr-5 mb-5">
              <h5 className="mb-4 mt-4">Why Does the World Need Another Content Platform?</h5>
              <p className="lead mb-1 mt-3">Most popular content outlets (YouTube, Facebook, etc.) use centralized, ad-based business models that can be costly for creators. More importantly, these sites  partner with investors, advertisers, payment processors or other third parties, all of whom demand final control over the content.When content runs afoul of these third parties, creators can be “demonetized” and kicked off the platform.</p>
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className="col-md-6 pr-5 mb-5">
              <h5 className="mb-4 mt-4">How is Patreos Different?</h5>
              <p className="lead mb-1 mt-3">Our decentralized model enables creative freedom. Patreos is blockchain-based, meaning it’s not controlled by a single entity. It’s transparent and fair. Patreos allows creators to connect directly with their fanbase through its subscription-based model, empowering fans to support the creators, not the platform. Creators can keep 100 percent of their pledges and retain full control over their work.</p>
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className="col-md-6 pr-5 mb-5">
              <h5 className="mb-4 mt-4">What is Staking?</h5>
              <p className="lead mb-1 mt-3">In non-technical terms, stakes are tied to deposited tokens, which can be done with PATR. All stakes are managed through smart contracts, which ensures a feeless experience.  When users stake PATR, it enables them to earn rewards, wave fees, follow preferred content creators, and get notifications when new content goes live. Conversely, when creators post content, stakers can have exclusive access to the work.</p>
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className="col-md-6 pr-5 mb-5">
              <h5 className="mb-4 mt-4">How Do Creators Get Paid for Their Work?</h5>
              <p className="lead mb-1 mt-3">Through pledges, which are subscription payments to a creator. They can be made in EOS or PATR. (Eventually, other tokens will be included in the Patreos ecosystem.)  Although there is a small fee charged for each pledge, the fee is waived when fans stake PATR.</p>
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className="col-md-6 pr-5 mb-5">
              <h5 className="mb-4 mt-4">How Are Recurring Pledges Made?</h5>
              <p className="lead mb-1 mt-3">Pledges are made using recurringpay, a battle-tested, smart-contract that enables periodic payments.</p>
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className="col-md-6 pr-5 mb-5">
              <h5 className="mb-4 mt-4">How Do Rewards Work?</h5>
              <p className="lead mb-1 mt-3">Rewards are paid out after the completion of a “round.”  We currently plan to have each round last for 2 weeks, and upon completion a new one immediately follows.  If PATR is unstaked during a round, then the participant is ineligible to claim rewards for that round.  If additional PATR is staked during a round, the starting-round balance is what will be used for reward calculations, not the increased stake balance.  After the completion of a round, participants are eligible to claim rewards, which will be proportional to individual’s staked amount divided by the total, aggregate amount of PATR staked.  Note, that the payout is only proportional to staking, as platform activity will also be a factor.  Rewards must not only be claimed, but must be claimed within a certain amount of time.  Recurring rewards are nice, but we want our users to visit the platform regularly.  We are proposing a 2 month lifespan for a rewards claim, after which, all unclaimed PATR will be returned to the pool for future rounds.</p>
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className="col-md-6 pr-5 mb-5">
              <h5 className="mb-4 mt-4">Are Rewards Currently Enabled?</h5>
              <p className="lead mb-1 mt-3">Rewards are currently accumulating for all users that stake, though the reward balance will be locked until the platform is launched and functional.  We are in the process of updating our website to reflect the accrued rewards balance.  We will also soon be launching a new rewards contract that will require PATR holders to activate by voting.  More details will soon follow.</p>
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className="col-md-6 pr-5 mb-5">
              <h5 className="mb-4 mt-4">Is Every Patreos User Entitled To Rewards?</h5>
              <p className="lead mb-1 mt-3">No. The Patreos platform rewards 40 million PATR to users annually (2 percent of max supply). But to further democratize the process, we enable token holders to withhold inflation rewards from creators should they publish materials advocating disturbing viewpoints, hate, or violence. In other words, the platform cannot deny pledges made to creators by fans, but it can deny the shared inflation rewards. This allows Patreos users to voice community values: Should a creator publish something users find troubling, they can penalize the creator as recourse.</p>
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className="col-md-6 pr-5 mb-5">
              <h5 className="mb-4 mt-4">Does Patreos Screen or Censor Any Content Posted on Its Platform?</h5>
              <p className="lead mb-1 mt-3">Patreos does not “host” content; therefore, it is unable to screen or censor content. Creators can share URLs of their work through the blockchain, but all information captured on the chain is immutable and outside of our influence. Writers, citizen journalists, artists, bloggers and others share their work in an unfiltered format. We support an open and inclusive free exchange of ideas. Patreos is a utility enabling creators to gain support for their materials. Any attempts at screening or censoring content would undermine our mission.  Patreos is only one of many content-sharing platforms. As we have seen, most social media platforms – including YouTube, Twitter and Facebook – have struggled with controlling objectionable users and content. Despite occasional objectionable posts, these sites remain immensely popular with loyal users who value the outlets.  However, Patreos does ask users to abide by a Code of Conduct.</p>
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className="col-md-6 pr-5 mb-5">
              <h5 className="mb-4 mt-4">Patreos Code of Conduct</h5>
              <p className="lead mb-1 mt-3">Patreos has zero interest in promoting content that advocates violence or hate or exploitation. If these are the cornerstones of your content, Patreos is not for you.  Blockchain is a decentralized platform which puts the power of ownership solely and exclusively on the creators of content. The onus of conduct enforcement, therefore, is a truly community effort.</p>
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className="col-md-6 pr-5 mb-5">
              <h5 className="mb-4 mt-4">Want to know more?</h5>
              <p className="lead mb-1 mt-3">Please email us at <a href="mailto:hello@patreos.com">hello@patreos.com</a></p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Faq);
