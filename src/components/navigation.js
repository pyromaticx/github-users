import React, { Component } from 'react';


export default class Navigation extends Component {
  handleLogin() {
    alert('You are now logged in');
  }
  render() {
    return (
      <nav className='navbarFlex'>
        <div className='logo'>
          <h4>Github Users</h4>
        </div>
        <div className='loginbutton'>
          <button
            className='btn btn-default'
            type='button'
            onClick={() => {this.handleLogin()}}>
              Login
          </button>
        </div>
      </nav>
    );
  }
}
