import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { API_URL } from './constant';
import Routes from './config/routes';

class App extends Component {
  state = {
    currentUser: localStorage.getItem('uid'),
  };

  setCurrentUser = (userId) => {
    this.setState({ currentUser: userId});
    localStorage.setItem('uid', userId);
  }

  render() {
    return (
      <div>
        <Routes currentUser={this.state.currentUser} setCurrentUser={this.setCurrentUser}/>
      </div>
    );
  }

}

export default withRouter(App);
