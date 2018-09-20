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
               <a href="#">
               <i className="fas fa-home ml-2 mr-2"></i>
               Home
               </a>
            </li>
            <li>
               <a href="#">
               <i className="fas fa-briefcase ml-2 mr-2"></i>
               Token
               </a>
            </li>
            <li>
               <a href="#">
               <i className="fas fa-image ml-2 mr-2"></i>
               Profile
               </a>
            </li>
            <li>
               <a href="#">
               <i className="fas fa-question ml-2 mr-2"></i>
               FAQ
               </a>
            </li>
            <li>
               <a href="#">
               <i className="fas fa-paper-plane ml-2 mr-2"></i>
               Contact
               </a>
            </li>
         </ul>
         <ul className="list-unstyled CTAs">
            <li>
               <a href="https://github.com/patreos" className="download">Github Source</a>
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
