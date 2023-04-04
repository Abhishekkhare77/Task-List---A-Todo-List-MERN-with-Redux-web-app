import React from 'react';

import  { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

import NavbarComp from './components/Navbar';
import AddItemModal from './components/AddItemModal';
import TodoList from './components/TodoList';

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'reactstrap';
import { useEffect } from 'react';


function App() {

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <div className="App">
        <NavbarComp />
        <Container>
          <AddItemModal />
          <TodoList />
        </Container>
      </div>
    </Provider>
  );
}

export default App;
