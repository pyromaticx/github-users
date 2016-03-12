import React, { Component } from 'react';
import Navigation from './navigation';
import Content from './content';
import Searchbox from './searchbox';
import Api from './api';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      currentData: ''
    };
  }
  //Passed down to SearchBox module.
  searchUserCallback(username) {
    Api.getRepos(username).then((data) => {
      this.setState({
        currentTerm: username,
        currentData: data
      });
    });
  }
  //Searches seleceted terms, and is passed down to Content
  termSearch(terms) {
    Api.getSearchRepos(terms).then((data) => {
       this.setState({
         currentTerm: terms.join(' '),
         currentData: data.items
       });
    });
  }
  render() {
    return (
      <div className='application'>
        <Navigation />
        <Searchbox
          searchUserCallback={(username) => {this.searchUserCallback(username)}} />
        <Content
          termSearch={(terms) => this.termSearch(terms)}
          currentTerm={this.state.currentTerm}
          repos={this.state.currentData}/>
      </div>
    );
  }
}
