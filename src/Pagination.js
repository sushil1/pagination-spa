import React, { Component } from 'react';
import _ from 'lodash';

class Pagination extends Component {
  state = {
    pagination: []
  };

  componentDidMount() {
    this.renderPagination();
  }

  renderPagination = () => {
    const { itemsPerPage, currentPage, dataLength } = this.props;
    const numPages = Math.ceil(dataLength / itemsPerPage);
    let startIndex, endIndex;
    if (numPages <= 10) {
      startIndex = 0;
      endIndex = numPages;
    } else {
      if (currentPage <= 6) {
        startIndex = 0;
        endIndex = 10;
      } else {
        if (currentPage + 4 >= numPages) {
          startIndex = numPages - 9;
          endIndex = numPages;
        } else {
          startIndex = currentPage - 5;
          endIndex = currentPage + 4;
        }
      }
    }
    const arr = _.range(startIndex + 1, endIndex + 1);
    this.setState({
      pagination: arr
    });
  };

  componentDidUpdate(nextProps) {
    console.log('nextProps === ', nextProps);
    if (nextProps.currentPage !== this.props.currentPage) {
      this.currentPage = nextProps.currentPage;
      this.renderPagination();
    }
  }

  render() {
    if (this.state.pagination.length === 0) {
      return null;
    }
    console.log('this.state === ', this.state.pagination);
    return <div />;
  }
}

export default Pagination;
