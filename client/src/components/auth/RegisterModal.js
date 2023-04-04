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
import { register } from '../../actions/authActions';
import { REGISTER_FAIL } from '../../types/types';
import { clearErrors } from '../../actions/errorActions';  

function RegisterModal(props) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // for feedback on login
  const [msg, setMsg] = useState(null);

  const handleNameChange = (e) => { setName(e.target.value); }
  const handleEmailChange = (e) => { setEmail(e.target.value); }
  const handlePasswordChange = (e) => { setPassword(e.target.value); }
  

  const toggle = useCallback(() => {
    props.clearErrors();
    setShow(!show);
  }, [props.clearErrors, show]);


  useEffect(() => {
    if(props.error.id === REGISTER_FAIL){
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
    const new_user = { name, email, password };
    props.register(new_user);
  };


  function getRegisterModal() {
    return (
     <>
        <NavLink
          onClick={() => toggle()}
          href={"#"}
        >
          Register
        </NavLink>

        <Modal
          isOpen={show}
          toggle={() => toggle()}
        >
          <ModalHeader toggle={() => toggle()}>
            Register
          </ModalHeader>
          <ModalBody>
            { msg ? <Alert color="danger">{msg}</Alert> : null }
            <Form onSubmit={(e) => handleOnSubmit(e)}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  className='mb-3'
                  onChange={(e) => handleNameChange(e)}
                />
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
                  Register
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </>
    );
  }

  return getRegisterModal();
}

// type checking
RegisterModal.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  // auth and error come from combineReducers() in rootReducer.js
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

const mapDispatchToProps = {
  register, clearErrors
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterModal);
