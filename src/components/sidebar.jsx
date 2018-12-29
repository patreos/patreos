import React from 'react';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import logo from '../../public/img/patreos-logo.png';

class Sidebar extends React.Component {
  render() {
    return (
      <nav id="sidebar">
         <div className="sidebar-header flex-container">
            <img src={ logo } alt='patreos-logo' height="50" />
            <h3 className="m-2 light">PATR<span className="normal">EOS</span></h3>
         </div>
         <ul className="list-unstyled components">
            <li className="active">
               <a href="/">
               <i className="fas fa-home ml-2 mr-2"></i>
               Home
               </a>
            </li>
            <li>
               <a href="/account">
               <i className="fas fa-user-circle ml-2 mr-2"></i>
               Account
               </a>
            </li>
            <li>
               <a href="/balance">
               <i className="fas fa-coins ml-2 mr-2"></i>
               Balance
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
               <a href="https://github.com/patreos" className="download" target="_blank">
               <i className="fab fa-github ml-4 mr-2"></i>
               Github Source
               </a>
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
