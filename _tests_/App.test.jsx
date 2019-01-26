/* #### Testing our App #### */
import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "../App";
import Table from "../components/Table"
import Search from "../components/Search"
import Loading from "../components/Loading"
import Footer from "../components/Footer";
import Err from "../components/Error";
import Button from "../components/Button";
import Sort from "../components/Sort";

Enzyme.configure({ adapter: new Adapter });

// Creating a Test suite for the App Component
describe ("App", () => {

  // Writing a test case for rendering properly the component
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <App/>, div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  // Writting Snapshot test for future checks
  test("has a valid snapshot", () => {
    const component = renderer.create(<App/>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});

// Creating a test suite for the Search Component
describe("Search", () => {

  const value = "redux";

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Search
        value = {value}
        placeholder = "type something!"
        type = "text"
        onChange = {() => { console.log("Seachbox Changed") }}
        onSubmit = {() => { console.log("Submitted") }}
        onClick = {() => { console.log("Clicked") }}
      >
        Search
      </Search>, div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  test("has a valid snapshot", () => {
    const component = renderer.create(
      <Search
        value = {value}
        placeholder = "type something!"
        type = "text"
        onChange = {() => { console.log("Seachbox Changed") }}
        onSubmit = {() => { console.log("Submitted") }}
        onClick = {() => { console.log("Clicked") }}
      >
        Search
      </Search>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});

// Creating a test suite for the Loading Component
describe("Loading", () => {

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Loading/>, div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  test("has a valid snapshot", () => {
    const component = renderer.create(
      <Loading/>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});

// Creating a test suite for the Error Component
describe("Error", () => {

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Err/>, div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  test("has a valid snapshot", () => {
    const component = renderer.create(<Err/>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});

// Creating a test suite for the Button Component
describe("Button", () => {

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Button
        type = "button"
        onClick = {() => { console.log("Button Clicked") }}
      >
        Click Me
      </Button>, div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  test("has a valid snapshot", () =>{
    const component = renderer.create(
      <Button
        type = "button"
        onClick = {() => { console.log("Button Clicked") }}
      >
        Click Me
      </Button>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});

// Creating a test suite for the Sort Component
describe("Sort", () => {

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Sort
        sortKey = {"sort"}
        activeSortKey = {"sort"}
        onSort = {() => {console.log("Sorted")}}
      >
        Sort
      </Sort>, div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  test("has a valid snapshot", () => {
    const component = renderer.create(
      <Sort
        sortKey = {"sort"}
        activeSortKey = {"sort"}
        onSort = {() => {console.log("Sorted")}}
      >
        Sort
      </Sort>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});

// Creating a test suite for the Footer Component
describe("Footer", () => {

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Footer/>, div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  test("has a valid snapshot", () => {
    const component = renderer.create(<Footer/>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});

// Creating a test suite for the Table Component
describe("Table", () => {

  const props = {
    list: [
      {title: "React", author: "Clark", num_comments: 12, points: 7, objectID: 0},
      {title: "Redux", author: "Abramov", num_comments: 77, points: 40, objectID: 1},
      {title: "Flux", author: "Simon", num_comments: 144, points: 3, objectID: 2}
    ]
  };

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Table
        {...props}
        onDismiss = {() => { console.log("Search Result Dismissed") }}
      />, div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it("has one element", () => {
    const element = shallow(
      <Table
        {...props}
        onDismiss = {() => { console.log("Search Result Dismissed") }}
      />
    );
    expect(element.find(".search-result").length).toBe(1);
  });

  test("has a valid snapshot", () => {
    const component = renderer.create(
      <Table
        {...props}
        onDismiss = {() => { console.log("Search Result Dismissed") }}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});