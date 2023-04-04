import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'reactstrap';
import { logout } from '../../actions/authActions';
import PropTypes from 'prop-types';

function Logout(props) {
  return (
    <>
      <NavLink onClick={props.logout} href="#">
        Logout
      </NavLink>
    </>
  );
}

Logout.propTypes = {
  logout: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  logout
};

export default connect(null, mapDispatchToProps)(Logout);
