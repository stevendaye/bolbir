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
import Err from "../components/Error";
import Button from "../components/Button";

Enzyme.configure({ adapter: new Adapter });

// Creating a Test Suit for the App Component
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

// Creating a test suit for the Search Component
describe("Search", () => {

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Search>
        Search
      </Search>, div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  test("has a valid snapshot", () => {
    const component = renderer.create(
      <Search>
        Search
      </Search>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});

// Creating a test suit for the Loading Component
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

// Creating a test suit for the Error Component
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

// Creating a test suit for the Button Component
describe("Button", () => {

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Button>
        Click Me
      </Button>, div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  test("has a valid snapshot", () =>{
    const component = renderer.create(
      <Button>
        Click Me
      </Button>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});

// Creating a test suit for the Table Component
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
      />, div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it("has three elements", () => {
    const element = shallow(
      <Table
        {...props}
      />
    );
    expect(element.find(".search-result").length).toBe(3);
  });

  test("has a valid snapshot", () => {
    const component = renderer.create(
      <Table
        {...props}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});