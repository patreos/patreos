import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import config from 'react-global-configuration';

//import '../styles/custom.css';
//import '../styles/index.scss';

import '../../public/styles/style.css';
import '../../public/fonts/ridley_grotesk/stylesheet.css';
import '../../public/fonts/proxima_nova/stylesheet.css';

import Home from './routes/home';
import Faq from './routes/faq';
import News from './routes/news';
import Account from './routes/account';
import Pledge from './routes/pledge';
import Balance from './routes/balance';
import Billing from './routes/billing';
import ManagePatr from './routes/patr';
import PageNotFound from './routes/404';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.config = config.get(process.env['ENV_VAR']); //eslint-disable-line
    this.env = process.env['ENV_VAR'];
  }

  render() {
    return (
      <div>
          <BrowserRouter>
            <div>
              <Switch>
                <Route exact path='/'
                  render={
                    (props) => {
                      return <Home {...props} config={ this.config } />
                    }
                  }
                />
                <Route exact path='/patr'
                  render={
                    (props) => {
                      return <ManagePatr {...props} config={ this.config } />
                    }
                  }
                />
                <Route exact path='/faq'
                  render={
                    (props) => {
                      return <Faq {...props} config={ this.config } />
                    }
                  }
                />
                <Route exact path='/news'
                  render={
                    (props) => {
                      return <News {...props} config={ this.config } />
                    }
                  }
                />
                <Route exact path='/account'
                  render={
                    (props) => {
                      if (this.env == 'production') return <PageNotFound />
                      return <Account {...props} config={ this.config } />
                    }
                  }
                />
                <Route exact path='/pledge'
                  render={
                    (props) => {
                      if (this.env == 'production') return <PageNotFound />
                      return <Pledge {...props} config={ this.config } />
                    }
                  }
                />
                <Route exact path='/balance'
                  render={
                    (props) => {
                      if (this.env == 'production') return <PageNotFound />
                      return <Balance {...props} config={ this.config } />
                    }
                  }
                />
                <Route exact path='/billing'
                  render={
                    (props) => {
                      if (this.env == 'production') return <PageNotFound />
                      return <Billing {...props} config={ this.config } />
                    }
                  }
                />
                <Route render={ (props) => <PageNotFound /> } />
              </Switch>
            </div>
          </BrowserRouter>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
