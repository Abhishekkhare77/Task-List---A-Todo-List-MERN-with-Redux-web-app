import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';


function TodoList(props) {

  function removeName(id) {
    props.deleteItem(id);
  }

  useEffect(() => {
    props.getItems();
  }, []);// eslint-disable-line

  const { items } = props.item;
  function getTodoList() {
    return (
      <ListGroup>
        <TransitionGroup className="todo_list">
          {items.map(({ _id, name }) => (
            <CSSTransition key={ _id } timeout={1200} classNames="fade">
              <ListGroupItem>
                {
                  props.isAuthenticated ?
                    <Button 
                      className="remove_btn"
                      color="danger"
                      size="sm"
                      onClick={() => removeName(_id)}
                    >
                      &times;
                    </Button>
                  :
                  null
                }
                {name}
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    );
  }

  return getTodoList();
}

// type checking props
TodoList.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool
}


// selecting what properties we want from our redux state
// item will be available through props.item above
const mapStateToProps = (state) => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
})

const mapDispatchToProps = {
  getItems, deleteItem
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
