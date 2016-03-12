import React, { Component } from 'react';


export default class Searchbox extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: ''
    }
  }
  handleInput(event) {
    this.setState({
      searchTerm: event.target.value
    });
  }
  submitSearch() {
    this.props.searchUserCallback(this.state.searchTerm);
    this.setState({
      searchTerm: ''
    });
  }
  enterSubmit(event) {
    if(event.keyCode == 13) {
      this.submitSearch();
    }
  }
  render() {
    return (
      <div className='searchContainer'>
        <input
          className='form-control'
          onKeyDown={(event) => {this.enterSubmit(event)}}
          placeholder='Enter a GitHub Username'
          onChange={(event) => {this.handleInput(event)}}
          value={this.state.searchTerm} />
        <button
          onClick={() => {this.submitSearch()}}
          className='btn btn-default'
          type='button'>
          Search
        </button>
      </div>
    );
  }
}
