import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'; 

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';

import Login from './components/auth/login';
import Register from './components/auth/register';

import './App.css';

class App extends React.Component {
  render(){
    return (
      <Router>
        <div className="App">
          <Navbar />
            <Route exact path="/" component={ Landing }/>
            <Route path="/login" component={ Login }/>
            <Route path="/register" component={ Register }/>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
