import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'; 
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

import { Provider } from 'react-redux';
import store from './store';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';

import Login from './components/auth/login';
import Register from './components/auth/register';

import './App.css';

// Check for token
if (localStorage.jwtToken){
  // set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // decode taken and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // set user and isAuthtenticated
  store.dispatch(setCurrentUser(decoded));
  
  // check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime){
    // logout the user
    store.dispatch(logoutUser());
    // TODO: clear current profile
    // redirect to login
    window.location.href = '/login';
  }
}

class App extends React.Component {
  render(){
    return (
      <Provider store={ store }>
        <Router>
          <div className="App">
            <Navbar />
              <Route exact path="/" component={ Landing }/>
              <div className="container">
                <Route exact path="/login" component={ Login }/>
                <Route exact path="/register" component={ Register }/>
              </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
