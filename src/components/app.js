import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import config from 'react-global-configuration';

import '../styles/custom.css';
import '../styles/index.scss';

import Home from './routes/home';
import Account from './routes/account';
import Pledge from './routes/pledge';
import Balance from './routes/balance';
import Billing from './routes/billing';
import ManagePatr from './routes/patr';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.config = config.get(process.env['ENV_VAR']); //eslint-disable-line
    this.env = process.env['ENV_VAR'];
  }


  componentWillMount() {

  }

  componentDidMount() {

  }

  componentDidUpdate(prevProps) {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div>
          <BrowserRouter>
            <div>
              <Switch>
                <Route
                  exact path='/'
                  render={
                    (props) => {
                      return <Home {...props} config={ this.config } />
                    }
                  }
                />
                <Route
                  exact path='/patr'
                  render={
                    (props) => {
                      return <ManagePatr {...props} config={ this.config } />
                    }
                  }
                />
                <Route
                  exact path='/account'
                  render={
                    (props) => {
                      if (this.env == 'production') return <div>Page Not Found...</div>
                      return <Account {...props} config={ this.config } />
                    }
                  }
                />
                <Route
                  exact path='/pledge'
                  render={
                    (props) => {
                      if (this.env == 'production') return <div>Page Not Found...</div>
                      return <Pledge {...props} config={ this.config } />
                    }
                  }
                />
                <Route
                  exact path='/balance'
                  render={
                    (props) => {
                      if (this.env == 'production') return <div>Page Not Found...</div>
                      return <Balance {...props} config={ this.config } />
                    }
                  }
                />
                <Route
                  exact path='/billing'
                  render={
                    (props) => {
                      if (this.env == 'production') return <div>Page Not Found...</div>
                      return <Billing {...props} config={ this.config } />
                    }
                  }
                />
                <Route render={ (props) => <div>Page Not Found...</div> } />
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
