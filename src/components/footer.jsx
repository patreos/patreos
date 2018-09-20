import React from 'react';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import logo from '../../public/img/patreos-logo.png';

class Footer extends React.Component {
  render() {
    return (
      <div className='footer-container'>
        <footer className="page-footer font-small blue pt-4 bg-dark">
          <div className="container text-center text-md-left">
            <div className="row">
              <div className="col-md-6 mt-md-0 mt-3">
                <h5 className="text-uppercase">PATREOS</h5>
                <p>Here you can use rows and columns here to organize your footer content.</p>
              </div>
              <hr className="clearfix w-100 d-md-none pb-3" />
              <div className="col-md-3 mb-md-0 mb-3">
                  <h5 className="text-uppercase">Links</h5>
                  <ul className="list-unstyled">
                    <li>
                      <a href="#!">Link 1</a>
                    </li>
                    <li>
                      <a href="#!">Link 2</a>
                    </li>
                    <li>
                      <a href="#!">Link 3</a>
                    </li>
                    <li>
                      <a href="#!">Link 4</a>
                    </li>
                  </ul>
                </div>
                <div className="col-md-3 mb-md-0 mb-3">
                  <h5 className="text-uppercase">Links</h5>
                  <ul className="list-unstyled">
                    <li>
                      <a href="#!">Link 1</a>
                    </li>
                    <li>
                      <a href="#!">Link 2</a>
                    </li>
                    <li>
                      <a href="#!">Link 3</a>
                    </li>
                    <li>
                      <a href="#!">Link 4</a>
                    </li>
                  </ul>
                </div>
            </div>
          </div>
          <div className="footer-copyright text-center py-3">© 2018 Copyright</div>
        </footer>
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

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
