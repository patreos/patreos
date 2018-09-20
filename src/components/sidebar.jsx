import React from 'react';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import logo from '../../public/img/patreos-logo.png';

class Sidebar extends React.Component {
  render() {
    return (
      <nav id="sidebar">
          <div className="sidebar-header">
            <img src={ logo } alt='patreos-logo' width='50px' />
            <h3>PATREOS</h3>
          </div>
          <ul className="list-unstyled components">
              <li className="active">
                  <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">
                      <i className="fas fa-home"></i>
                      Home
                  </a>
                  <ul className="collapse list-unstyled" id="homeSubmenu">
                      <li>
                          <a href="#">Home 1</a>
                      </li>
                      <li>
                          <a href="#">Home 2</a>
                      </li>
                      <li>
                          <a href="#">Home 3</a>
                      </li>
                  </ul>
              </li>
              <li>
                  <a href="#">
                      <i className="fas fa-briefcase"></i>
                      Token
                  </a>
                  <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">
                      <i className="fas fa-copy"></i>
                      Pages
                  </a>
                  <ul className="collapse list-unstyled" id="pageSubmenu">
                      <li>
                          <a href="#">Page 1</a>
                      </li>
                      <li>
                          <a href="#">Page 2</a>
                      </li>
                      <li>
                          <a href="#">Page 3</a>
                      </li>
                  </ul>
              </li>
              <li>
                  <a href="#">
                      <i className="fas fa-image"></i>
                      Profile
                  </a>
              </li>
              <li>
                  <a href="#">
                      <i className="fas fa-question"></i>
                      FAQ
                  </a>
              </li>
              <li>
                  <a href="#">
                      <i className="fas fa-paper-plane"></i>
                      Contact
                  </a>
              </li>
          </ul>
          <ul className="list-unstyled CTAs">
              <li>
                  <a href="https://github.com/patreos" className="download">Github Source</a>
              </li>
              <li>
                  <a href="https://bootstrapious.com/p/bootstrap-sidebar" className="article">Back to article</a>
              </li>
          </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
