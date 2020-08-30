import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Components
import Landing from "./Components/Landing";
import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";
import MainDisplay from "./Components/MainDisplay";
import New from "./Components/New";

export default class App extends Component {
  state = {
    journal: "",
    month: "",
    year: "",
    tags: [],
    entryModal: false,
    showEntry: "",
  };

  //Sidebar Search
  handleFormChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  //Tags Input Functions
  addTags = (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      this.setState({
        tags: [...this.state.tags, e.target.value],
      });
      e.target.value = "";
    }
  };

  removeTags = (index) => {
    this.setState({
      tags: [
        ...this.state.tags.filter(
          (tag) => this.state.tags.indexOf(tag) !== index
        ),
      ],
    });
  };

  //Clear Filters
  clearFilters = () => {
    this.setState({
      journal: "",
      month: "",
      year: "",
      tags: [],
    });
  };

  //Entry Modal Toggle
  openModal = (e, entry) => {
    e.preventDefault();
    this.setState({ entryModal: true, showEntry: entry });
  };

  closeModal = (e) => {
    e.preventDefault();
    this.setState({ entryModal: false });
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={(props) => <Landing {...props} />} />
          <Route
            exact
            path="/home"
            render={(props) => (
              <>
                <Header />
                <Sidebar
                  page="Home"
                  addTags={this.addTags}
                  removeTags={this.removeTags}
                  tags={this.state.tags}
                  handleFormChange={this.handleFormChange}
                  handleFormSubmit={this.handleFormSubmit}
                  clearFilters={this.clearFilters}
                />
                <MainDisplay
                  {...props}
                  page="Main"
                  journal={this.state.journal}
                  month={this.state.month}
                  year={this.state.year}
                  tags={this.state.tags}
                  showEntryModal={this.state.entryModal}
                  openModal={this.openModal}
                  closeModal={this.closeModal}
                  showEntry={this.state.showEntry}
                />
              </>
            )}
          />
          <Route
            path="/journal/:journalname"
            render={(props) => (
              <>
                <Header />
                <Sidebar
                  page="Journal"
                  addTags={this.addTags}
                  removeTags={this.removeTags}
                  tags={this.state.tags}
                  handleFormChange={this.handleFormChange}
                  handleFormSubmit={this.handleFormSubmit}
                  clearFilters={this.clearFilters}
                />
                <MainDisplay
                  {...props}
                  page="Journal"
                  journal={this.state.journal}
                  month={this.state.month}
                  year={this.state.year}
                  tags={this.state.tags}
                  showEntryModal={this.state.entryModal}
                  openModal={this.openModal}
                  closeModal={this.closeModal}
                  showEntry={this.state.showEntry}
                />
              </>
            )}
          />
          <Route
            exact
            path="/new/:type"
            render={(props) => (
              <>
                <Header />
                <New {...props} />
              </>
            )}
          />
        </Switch>
      </Router>
    );
  }
}
