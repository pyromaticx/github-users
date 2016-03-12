import React, { Component } from 'react';
import Repo from './repo';

export default class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      userError: '',
      selectedTerms: [],
    };
  }
  componentWillReceiveProps(nextProps) {
    this.checkRepos(nextProps.repos, nextProps.currentTerm);
  }
  //Checks list of repositories passed from parent, App, for bad results and
  //handles displaying correct msgs for the situation. If everything is ok with
  //passed data, sort them chronilogically and place into state
  checkRepos(repos, currentTerm) {
    if(repos.message === 'Not Found') {
      this.setState({
        repos: [],
        userError: `User ${currentTerm} Not Found`
      });
    } else if(repos.length === 0) {
      this.setState({
        repos: [],
        userError: `No public repositories found for ${currentTerm}`
      });
    } else if(repos.hasOwnProperty('total_count') && repos.total_count === 0) {
      this.setState({
        repos: [],
        userError: `No repositories found, search again`
      });
    } else {
      let sortedRepos = this.sortRepos(repos);
      this.setState({
        userError: '',
        repos: sortedRepos,
        selectedTerms: []
      });
    }
  }
  //actual sorting function
  sortRepos(repos) {
    let sorted = repos.sort(function(a, b) {
      if(a.updated_at < b.updated_at) {
        return -1;
      }
      if(a.updated_at > b.updated_at) {
        return 1;
      }
      return 0;
    });
    return sorted.reverse();
  }
  //Passed down to Repo module. Filters out any duplicate values and places
  //them in Content modules state
  addSearchTerm(term) {
    let terms = this.state.selectedTerms;

    if(terms.indexOf(term) >= 0) {
      terms.splice(terms.indexOf(term), 1);
    } else {
    terms.push(term);
    }

    this.setState({
      selectedTerms: terms
    });
  }
  //Also passed down to repo to trigger a search based on selected terms (lightbulb)
  termSearch() {
    this.props.termSearch(this.state.selectedTerms)
  }

  render() {
    let formattedRepos = this.state.repos.map((repo) => {
      return (
        <Repo
          termsSelected={this.state.selectedTerms}
          termSearchCB={() => {this.termSearch()}}
          addTerm={(term) => {this.addSearchTerm(term)}}
          key={repo.updated_at}
          data={repo} />
      );
    });
    return (
      <div className='contentFlex'>
        <h4>{this.state.userError}{formattedRepos.length > 0 ? 'Results for: ' + this.props.currentTerm : ''}</h4>
        {formattedRepos}
      </div>
    );
  }
}
