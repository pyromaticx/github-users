import React, {Component} from 'react';
import TermSearch from './termsearch';
export default class Repo extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      repoName: '',
      hoverState: ''
    };
  }

  componentWillMount() {
    let names = this.props.data.full_name.split('/');
    this.setState({
      names: names
    });
  }
  //sets position for tooltip when hovering lightbulb icon
  handleHover(event) {
    this.setState({
      hoverPos: {
        top: event.clientY + 10,
        left: event.clientX,
      },
      hoverState: 'tooltipover'
    });
  }
  //clears tool tip
  handleMouseLeave() {
    this.setState({
      hoverState: ''
    });
  }
  followLink() {
    window.open(this.props.data.html_url);
  }
  render() {
    let repoName = this.state.names[1].split('-').map((el, idx, arr) => {
      return (
        <TermSearch
          selectedTerms={this.props.termsSelected}
          addTerms={(term) => {this.props.addTerm(term)}}
          idx={idx}
          term={el}
          key={idx + el}
          len={arr.length} />
        );
    });
    return (

        <div className='repo'>
          <span className='repoTitle'>
            <h3>
              {this.state.names[0]} / {repoName}
              <span
                onMouseOver={(e) => {this.handleHover(e)}}
                onMouseLeave={() => this.handleMouseLeave()}
                onClick={() => {this.props.termSearchCB()}}
                className={this.props.termsSelected.length >= 1 ? 'fa fa-lightbulb-o getLit': 'fa fa-lightbulb-o getDim'}></span>
            </h3>
          </span>
          <div style={this.state.hoverPos} className={'tooltip ' + this.state.hoverState}>
            Click to search selected terms
          </div>
          <a onClick={() => this.followLink()}>{this.props.data.html_url}</a>
          <br />
          <h5>{this.props.data.description || 'No description'}</h5>
          <br />
          <h5>{'Open issues: ' + this.props.data.open_issues}</h5>
          <br />
          <h5>{'Last commit: ' + Date(this.props.data.updated_at)}</h5>
        </div>

    );
  }
}
