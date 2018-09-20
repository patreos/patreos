import React from 'react';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import logo from '../../public/img/patreos-logo.png';

class Header extends React.Component {
  render() {
    return (
      <div className='header-container'>
        <nav className='navbar navbar-expand-lg navbar-light fixed-top bg-dark' id='mainNav'>
          <div className='container'>
            <img src={ logo } alt='patreos-logo' width='50px' />
            <a className='navbar-brand m-2' href='#page-top'>PATREOS</a>
            <button className='navbar-toggler navbar-toggler-right' type='button' data-toggle='collapse' data-target='#navbarResponsive' aria-controls='navbarResponsive' aria-expanded='false' aria-label='Toggle navigation'>
              <span className='navbar-toggler-icon'></span>
            </button>
            <div className='collapse navbar-collapse' id='navbarResponsive'>
              <ul className='navbar-nav ml-auto'>
                <li className='nav-item m-2'>
                  <a className='nav-link' href='#about'>About</a>
                </li>
                <li className='nav-item m-2'>
                  <a className='nav-link' href='#services'>Services</a>
                </li>
                <li className='nav-item m-2'>
                  <a className='nav-link' href='#portfolio'>Portfolio</a>
                </li>
                <li className='nav-item m-2'>
                  <a className='nav-link' href='#contact'>Contact</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
