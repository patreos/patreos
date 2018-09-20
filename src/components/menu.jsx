import React from 'react';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';

class Menu extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
              <button type="button" id="sidebarCollapse" className="btn btn-info">
                  <i className="fas fa-align-left mr-2"></i>
                  <span>Toggle Sidebar</span>
              </button>
              <button className="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <i className="fas fa-align-justify"></i>
              </button>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="nav navbar-nav ml-auto">
                      <li className="nav-item active">
                          <a className="nav-link" href="#">News</a>
                      </li>
                      <li className="nav-item">
                          <a className="nav-link" href="#">Team</a>
                      </li>
                      <li className="nav-item">
                          <a className="nav-link" href="#">Contact</a>
                      </li>
                      <li className="nav-item">
                          <a className="nav-link" href="#">Privacy</a>
                      </li>
                  </ul>
              </div>
          </div>
      </nav>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {};
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
