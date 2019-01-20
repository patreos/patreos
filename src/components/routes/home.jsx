import React from 'react';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';

import Sidebar from '../sidebar';
import Menu from '../menu';

class Home extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='wrapper'>
        <Sidebar homeMenuActive={ 'active' } config={ this.props.config } eos={this.props.eos} scatterEos={ this.props.scatterEos }/>
        <div id="content">
            <div>
              <Menu config={ this.props.config } eos={this.props.eos} scatterEos={ this.props.scatterEos }/>
              <div>Welcome</div>
            </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
