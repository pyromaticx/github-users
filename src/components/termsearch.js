import React, {Component} from 'react';

export default class TermSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      highlighted: ''
    }
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.selectedTerms.indexOf(this.props.term) === -1) {
      this.setState({
        highlighted: ''
      });
    }
  }

  handleClick() {
    this.props.addTerms(this.props.term)
    this.setState({
      highlighted: this.state.highlighted === 'highlight' ? '' : 'highlight'
    });
  }
  render() {

    return (
      <span
        onClick={() => {this.handleClick()}}
        className=''>
        <span className={this.props.selectedTerms.length > 0 ? this.state.highlighted : ''}>
          {this.props.term}
        </span>
        {this.props.idx < this.props.len - 1 ? '-' : ''}
      </span>
    );
  }
}
