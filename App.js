/* ## bolbir main file: App.js ## */
import React, { Component } from "react";
import Search from "./components/Search";
import Table from "./components/Table";
import Loading from "./components/Loading";
import Err from "./components/Error";
import Footer from "./components/Footer";
import "./src/css/app.css"
import Button from "./components/Button";
import axios from "axios";

const PATH_BASE = "http://hn.algolia.com/api/v1";
const PATH_SEARCH = "/search";
const PARAM_SEARCH = "query="
const DEFAULT_SEARCH = "redux";
const PARAM_PAGE = "page=";
const PARAM_HPP = "hitsPerPage=";
const DEFAULT_HPP = "15";

class App extends Component {
  // Using ES6 Class Field to prevent the component from updating the state when it's unmounted
  _isMounted = false;

  constructor (props) {
    super(props);

    this.state = {
      results: null,
      searchTerm: DEFAULT_SEARCH,
      error: null,
      isLoading: false,
      isLoadingMore: false,
      searchKey: ""
    };

    this.loadMoreTopStories = this.loadMoreTopStories.bind(this);
    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
    this.fecthSearchTopStories = this.fecthSearchTopStories.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.notify = this.notify.bind(this);
  }

  // Defining core coponent methods
  fecthSearchTopStories(searchTerm, page = 0) {
    this.setState({ isLoading: true });
    axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(result => this._isMounted && this.setSearchTopStories(result.data))
      .catch(error => this._isMounted && this.setState({ error }));
  }
  setSearchTopStories (result) {
    const { hits, page } = result;
    this.setState( prevState => {
      const { results, searchKey } = prevState;
      const old_hits = (results && results[searchKey]) ? results[searchKey].hits : [];
      const updatedHits = [ ...old_hits, ...hits];
      return {
        results: {
          ...results,
          [searchKey]: {
            hits: updatedHits,
            page
          }
        },
        isLoading: false
      }
    });
  } 
  onSearchSubmit (e) {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    this.needsToSearchTopStories(searchTerm) && this.fecthSearchTopStories(searchTerm);
    e.preventDefault();
  }
  needsToSearchTopStories (searchTerm) {
    const { results } = this.state;
    return !results[searchTerm];
  }

  onDismiss (id) {
    this.setState( prevState => {
      const { results, searchKey } = prevState;
      const {hits, page} = results[searchKey];
      const isNotID = item => item.objectID !== id;
      const updatedHits = hits.filter(isNotID);
      return {
        results: {
          ...results,
          [searchKey]: {
            hits: updatedHits,
            page
          }
        }
      }
    })
  }
  onSearchChange (e) {
    this.setState({ searchTerm: e.target.value });
  }
  notify () {
    console.log("Search Term Sent.");
  }
  loadMoreTopStories () {
    this.setState({ isLoadingMore: true });
  }

  // Using core component licycles methods
  componentDidMount () {
    this._isMounted = true;
    const { searchTerm } = this.state;
    this.fecthSearchTopStories(searchTerm);
  }
  componentWillUnmount () {
    this._isMounted = false;
  }

  render () {
    const hello = "Hello I am bolbir. Your Friendly Search App";

    const {
      results,
      searchTerm,
      error,
      isLoading,
      isLoadingMore,
      searchKey
    } = this.state;

    const page = (
      results &&
      results[results] &&
      results[searchKey].page
    ) || 0; // In case there is no results, so the page number is 0;

    const list = (
      results &&
      results[searchKey] &&
      results[searchKey].hits
    ) || []; // In case there is no list result, it returns an empty array. With this, no more need to do a conditional rendering;
    
    return (
      <div className = "app_wrapper">
            
        <header>
          <div className = "up-front">
            <div className = "app-name">
              <h1>bolbir</h1>
            </div>
            <nav>
              <ul>
                <li><a href="#">Sign in</a></li>
                <li><a href="#">Popular</a></li>
                <li><a href="#">Pin</a></li>
              </ul>
            </nav>
            <h2>{hello}</h2>
            <Search
              value = {searchTerm}
              placeholder = "Type something you are interested in!"
              type = "search"
              onChange = {this.onSearchChange}
              onSubmit = {this.onSearchSubmit}
              onClick = {this.notify}
            >
              Search
            </Search>
          </div>
          <div>
            <h4>
              <small><a href = "#">I am looking for tech related contents</a></small>&nbsp;&nbsp;&nbsp;<span>|
              </span>&nbsp;&nbsp;<small><a href = "#">Person of Interest</a></small>
            </h4>  
          </div>
        </header>

        <TableWithError
          error = {error}
          list = {list}
          onDismiss = {this.onDismiss}
        />
        <ButtonWithLoading
          type = "button"
          className = "more-btn"
          error = {error}
          isLoading = {isLoading}
          isLoadingMore = {isLoadingMore}
          onClick = {() => { this.loadMoreTopStories() || this.fecthSearchTopStories(searchKey, page + 1) }}
        >
          +
        </ButtonWithLoading>
        
        <Footer/>
      </div>
    );
  }
}

// Creating a HOC for the Error and Table Components
const withError = Component => ({ error, ...rest }) =>
  error
    ? <Err/>
    : <Component {...rest} />

const TableWithError = withError(Table);

// Creating a HOC for the Loading and More Button Components
const withLoading = Component => ({ isLoading, error, isLoadingMore, ...rest }) =>
  isLoading
    ? <Loading
        error = {error}
        isLoadingMore = {isLoadingMore}
      />
    : <div className = "more-btn-wrapper">
        <Component {...rest} />
      </div>

const ButtonWithLoading = withLoading(Button);

export default App;