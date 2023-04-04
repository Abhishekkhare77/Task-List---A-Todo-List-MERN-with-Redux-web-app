import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';

import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import PropTypes from 'prop-types';


function AddItemModal(props) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    props.addItem({ name: name });
    setShow(!show);
  };

  function getAddItemModal() {
    return (
     <>
        {
          props.isAuthenticated ?
            <Button
              color="primary"
              style={{marginBottom: '2rem'}}
              onClick={() => setShow(!show)}
            >
              Add Item
            </Button>
          :
          <h5 className="mb-3 ml-2">Log in to change items.</h5>
        }

        <Modal
          isOpen={show}
          toggle={() => setShow(!show)}
        >
          <ModalHeader toggle={() => setShow(!show)}>
            Add an item
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={(e) => handleOnSubmit(e)}>
              <FormGroup>
                <Label for="item">Item</Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Add an item"
                  onChange={(e) => handleNameChange(e)}
                />
                <Button
                  color="dark"
                  style={{marginTop: '2rem'}}
                  block
                >
                  Add Item
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </>
    );
  }

  return getAddItemModal();
}

AddItemModal.propTypes = {
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = {
  addItem
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddItemModal);
