import React, {useState} from 'react';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container
} from 'reactstrap';

function NavbarComp(props) {
  const [show, setShow] = useState(false);

  const unknownUserNav = (
    <>
      <NavItem>
        <RegisterModal />
      </NavItem>
      <NavItem>
        <LoginModal />
      </NavItem>
    </>
  );

  const knownUserNav = (
    <>
      <NavItem>
        <span className="navbar-text mr-3">
          <strong> { props.auth.user ? "Welcome " + props.auth.user.name : "" }</strong>
        </span>
      </NavItem>
      <NavItem>
        <Logout />
      </NavItem>
    </>
  );

  function getNavbar() {
    return(
    <>
      <Navbar color="primary" dark expand="sm" className="mb-5">
        <Container>
          <NavbarBrand href="/">Todo List</NavbarBrand>
          <NavbarToggler onClick={() => setShow(!show)} />
          <Collapse isOpen={show} navbar>
          <Nav className="ml-auto" navbar>
            { props.auth && props.auth.isAuthenticated ? knownUserNav : unknownUserNav }
          </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
    );
  }

  return getNavbar();
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(NavbarComp);
