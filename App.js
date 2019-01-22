/* ## bolbir main file: App.js ## */
import React, { Component } from "react";
import Search from "./components/Search";
import Table from "./components/Table";
import Loading from "./components/Loading";
import Err from "./components/Error";
import "./src/css/app.css"
import Button from "./components/Button";

const PATH_BASE = "http://hn.algolia.com/api/v1";
const PATH_SEARCH = "/search";
const PARAM_SEARCH = "query="
const DEFAULT_SEARCH = "redux";
const PARAM_PAGE = "page=";
const PARAM_HPP = "hitsPerPage=";
const DEFAULT_HPP = "25";

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      result: null,
      searchTerm: DEFAULT_SEARCH,
      error: null,
      isLoading: false
    };

    this.fecthSearchTopStories = this.fecthSearchTopStories.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  // Defining core coponent methods
  onDismiss (id) {
    const { result } = this.state;
    const isNotID = item => item.objectID !== id;
    const updatedHits = result.hits.filter(isNotID);
    this.setState({result: { hits: updatedHits }});
  }
  onSearchChange (e) {
    this.setState({ searchTerm: e.target.value });
  }
  setSearchTopStories (result) {
    const { hits, page } = result;
    const old_hits = page !== 0 ? this.state.result.hits : [];
    const updatedHits = [ ...hits, ...old_hits ];
    this.setState({
      result: { hits: updatedHits },
      isLoading: false
    });
  } 
  onSearchSubmit (e) {
    const { searchTerm } = this.state;
    this.fecthSearchTopStories(searchTerm);
    e.preventDefault();
  }
  fecthSearchTopStories(searchTerm, page = 0) {
    this.setState({ isLoading: true });
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => this.setState({ error }));
  }

  // Using core component licycles methods
  componentDidMount () {
    const { searchTerm } = this.state;
    this.fecthSearchTopStories(searchTerm);
  }

  render () {
    const hello = "Hello I am bolbir. Your Friendly Search App";
    const {
      result,
      searchTerm,
      error,
      isLoading
    } = this.state;
    const page = (result && result.page) || 0; // in case there is no result, so the page is 0;
    
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
            >
              Search
            </Search>
          </div>
          <div>
            <h4>
              <small><a href = "#">I am looking for tech related contents</a></small>&nbsp;&nbsp;&nbsp;<span>|</span>&nbsp;&nbsp;<small><a href = "#">Person of Interest</a></small>
            </h4>  
          </div>
        </header>

        { result
          ? <Table
              list = {result.hits}
              onDismiss = {this.onDismiss}
            />
          : <Loading
            error = {error}
          />
        }
        { error
          ? <Err/>
          : ""
        }
        {
          isLoading
          ? ""
          : <div className = "more-btn-wrapper">
              <Button
                type = "button"
                className = "more-btn"
                onClick = {() => {this.fecthSearchTopStories(searchTerm, page + 1)}}
              >
                +
              </Button>
            </div>
        }
      </div>
    );
  
  }
}

export default App;