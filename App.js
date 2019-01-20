/* ## bolbir main file: App.js ## */
import React, { Component } from "react";
import Search from "./components/Search";
import Table from "./components/Table";
import Loading from "./components/Loading";
import Err from "./components/Error";
import "./src/css/app.css"

const PATH_BASE = "http://hn.algolia.com/api/v1";
const PATH_SEARCH = "/search";
const PARAM_SEARCH = "query="
const DEFAULT_SEARCH = "redux";

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      result: null,
      searchTerm: DEFAULT_SEARCH,
      error: null
    };

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
    this.setState({ result });
  }

  // Using core component licycles methods
  componentDidMount () {
    const { searchTerm } = this.state;
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => this.setState({ error }));
  }

  render () {
    const { result, searchTerm, error } = this.state;
    const hello = "Hello I am bolbir. Your Friendly Search App";
    console.log(result);
    
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
            >
              Search
            </Search>
          </div>
          <div>
            <h4>
              <small><a href = "#">I am looking for tech contents</a></small>&nbsp;&nbsp;&nbsp;<span>|</span>&nbsp;&nbsp;<small><a href = "#">Person of Interest</a></small>
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
      </div>
    );
  
  }
}

export default App;