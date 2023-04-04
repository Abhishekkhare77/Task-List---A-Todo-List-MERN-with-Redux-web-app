import React, { useState, useEffect, useCallback } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from 'reactstrap';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';
import { LOGIN_FAIL } from '../../types/types';
import { clearErrors } from '../../actions/errorActions';  

function LoginModal(props) {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // for feedback on login
  const [msg, setMsg] = useState(null);

  const handleEmailChange = (e) => { setEmail(e.target.value); }
  const handlePasswordChange = (e) => { setPassword(e.target.value); }
  

  const toggle = useCallback(() => {
    props.clearErrors();
    setShow(!show);
  }, [props.clearErrors, show]);


  useEffect(() => {
    if(props.error.id === LOGIN_FAIL){
      setMsg(props.error.msg.msg);
    }  
    else {
      setMsg(null);
    }  

    if(show && props.isAuthenticated){
      toggle();
    }

  }, [props.error, toggle, props.isAuthenticated, show]);  
  

  const handleOnSubmit = (e) => {
    e.preventDefault();

    props.login({ email, password });
  };


  function getLoginModal() {
    return (
     <>
        <NavLink
          onClick={() => toggle()}
          href={"#"}
        >
          Login
        </NavLink>

        <Modal
          isOpen={show}
          toggle={() => toggle()}
        >
          <ModalHeader toggle={() => toggle()}>
            Login
          </ModalHeader>
          <ModalBody>
            { msg ? <Alert color="danger">{msg}</Alert> : null }
            <Form onSubmit={(e) => handleOnSubmit(e)}>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className='mb-3'
                  onChange={(e) => handleEmailChange(e)}
                />
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className='mb-3'
                  onChange={(e) => handlePasswordChange(e)}
                />
                <Button
                  color="dark"
                  style={{marginTop: '2rem'}}
                  block
                >
                  Login
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </>
    );
  }

  return getLoginModal();
}

// type checking (only checked in development mode)
LoginModal.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  // auth and error come from combineReducers() in rootReducer.js
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

const mapDispatchToProps = {
  login, clearErrors
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginModal);
