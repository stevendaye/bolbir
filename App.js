import React, { Component } from "react";
import list from "./client/list";
import Search from "./components/Search";
import Table from "./components/Table";
import "./src/css/app.css"

const DEFAULT_SEARCH = "W";

const isSearched = searchTerm => item =>
  item.title.toLowerCase().includes(searchTerm) || item.title.toUpperCase().includes(searchTerm);

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      list,
      searchTerm: ""
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }

  onRemove (id) {
    const isNotID = item => item.objectID !== id;
    const updatedList = this.state.list.filter(isNotID);
    this.setState({list: updatedList});
  }
  onSearchChange (e) {
    this.setState({ searchTerm: e.target.value });
  }

  render () {
    const { list, searchTerm } = this.state;
    const hello = "Hello I am bolbir. Your Friendly Search App";
    
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
              onChange = {this.onSearchChange}
              placeholder = "Type something you are interested in"
              type = "search"
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

        <Table
          pattern = {searchTerm}
          onRemove = {this.onRemove}
          isSearched = {isSearched}
          list = {list}
        />

      </div>
    );
  
  }
}

export default App;