import React from "react";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import App from "./App";
import EntryDisplay from "./Components/EntryDisplay";
import EntryModal from "./Components/EntryModal";
import Landing from "./Components/Landing";
import Header from "./Components/Header";
import Main from "./Components/Main";
import MainDisplay from "./Components/MainDisplay";
import New from "./Components/New";
import NewEntry from "./Components/NewEntry";
import NewJournal from "./Components/NewJournal";
import Sidebar from "./Components/Sidebar";
import TagsInput from "./Components/TagsInput";

describe("App", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe("Landing", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Landing />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe("Main", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Main />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe("Header", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Header />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe("Sidebar", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Sidebar />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe("Tags Input ", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<TagsInput />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe("Main Display", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<MainDisplay />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe("Entry Display", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<EntryDisplay />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe("Entry Modal", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<EntryModal />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe("New", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<New />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe("New Entry", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<NewEntry />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe("New Journal", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<NewJournal />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
