import React, { Component } from 'react';
import axios from 'axios';
import Loader from 'react-loader';
import Pagination from './Pagination';

import './App.css';

const resonateUrl = `https://resonatetest.azurewebsites.net/data`;
//bypassing 'no cors allowed' by the resource server
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

const ITEMS_PER_PAGE = 5;

class App extends Component {
  state = {
    data: [],
    isLoading: false,
    error: null,
    current_page: 0,
    selected: null
  };

  fetchInitialData = () => axios.get(proxyUrl + resonateUrl);

  componentDidMount() {
    this.setState({ isLoading: true });
    this.fetchInitialData()
      .then(response => response.data)
      .then(data => this.setState({ data, current_page: 0, isLoading: false }))
      .catch(error => {
        console.log('error ==== ', error);
        this.setState({ error, isLoading: false });
      });
  }

  itemSelected = item =>
    this.setState({
      selected: item
    });

  handlePageSelected(pageNum) {
    this.setState({
      current_page: pageNum
    });
  }

  renderPagination = () => {
    const numPages = Math.ceil(this.state.data.length / ITEMS_PER_PAGE);
    const paginationView = Array.from({ length: numPages }).map((_, i) => (
      <li key={i}>
        <a
          onClick={() => this.handlePageSelected(i)}
          className={
            this.state.current_page === i ? 'active page-number' : 'page-number'
          }
        >
          {i + 1}
        </a>
      </li>
    ));

    if (numPages <= 10) {
      return paginationView;
    } else {
      if (this.state.current_page <= 6) {
        return paginationView.slice(0, 10);
      } else if (this.state.current_page + 4 >= numPages) {
        return paginationView.slice(numPages - 9, numPages);
      } else {
        return paginationView.slice(
          this.state.current_page - 5,
          this.state.current_page + 4
        );
      }
    }
  };

  renderPaginatedList = () => {
    let pageList;
    if (this.state.current_page === 0) {
      pageList = this.state.data.slice(this.state.current_page, ITEMS_PER_PAGE);
    } else {
      pageList = this.state.data.slice(
        this.state.current_page * ITEMS_PER_PAGE,
        this.state.current_page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
      );
    }
    return pageList;
  };

  render() {
    const { isLoading, selected, current_page } = this.state;
    const numPages = Math.ceil(this.state.data.length / ITEMS_PER_PAGE);
    const prevPage = (
      <a
        className={current_page === 0 ? 'disable page-number' : 'page-number'}
        onClick={() => this.handlePageSelected(current_page - 1)}
      >
        {'<< '}Prev
      </a>
    );
    const nexPage = (
      <a
        className={
          current_page === numPages - 1 ? 'disable page-number' : 'page-number'
        }
        onClick={() => this.handlePageSelected(current_page + 1)}
      >
        Next{' >>'}
      </a>
    );

    const renderMenu = this.renderPaginatedList()
      ? this.renderPaginatedList().map(item => (
          <li
            className={
              selected != null && selected.id === item.id
                ? 'active list-item'
                : 'list-item'
            }
            key={item.id}
            onClick={() => this.itemSelected(item)}
          >
            <span className="username">{item.user}</span>{' '}
            <span className="score">{item.score}</span>
          </li>
        ))
      : null;

    return (
      <div className="container">
        <Loader loaded={!isLoading}>
          <div className="data-list">
            <div className="menu">
              <ul className="list">{renderMenu}</ul>
            </div>
            <div className="details">
              {selected != null ? (
                <div>
                  <div className="meta-user">
                    <div className="meta-username">{selected.user}</div>
                    <div className="meta-score">{selected.score}</div>
                  </div>
                  <div className="meta-description">
                    <p>{selected.verbatim}</p>
                  </div>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
          <div className="pagination-container">
            <div className="pagination">
              <ul className="page-number-list">
                {this.state.data.length !== 0 && prevPage}
                {this.state.data.length !== 0 ? this.renderPagination() : ''}
                {this.state.data.length !== 0 && nexPage}
              </ul>
            </div>
            {this.state.data.length !== 0 && (
              <Pagination
                currentPage={current_page}
                dataLength={this.state.data.length}
                itemsPerPage={ITEMS_PER_PAGE}
              />
            )}
          </div>
        </Loader>
      </div>
    );
  }
}

export default App;
