import React, { Component } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MainDisplay from "./MainDisplay";
import New from "./New";

export default class Main extends Component {
  state = {
    tags: [],
    journal: "",
    month: "",
    year: "",
  };

  handleFormChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  //Sidebar functions
  clearFilters = () => {
    this.setState({
      journal: "",
      month: "",
      year: "",
      tags: [],
    });
  };

  addTags = (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      this.setState({ tags: [...this.state.tags, e.target.value] });
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

  render() {
    return (
      <>
        <Router>
          <Header user={this.props.userInfo.firstname} />
          <Route
            exact
            path="/"
            render={(props) => (
              <>
                <Sidebar
                  page="main"
                  entries={this.props.entries}
                  journals={this.props.journals}
                  tags={this.state.tags}
                  addTags={this.addTags}
                  removeTags={this.removeTags}
                  handleFormChange={this.handleFormChange}
                  clearFilters={this.clearFilters}
                />
                <MainDisplay
                  {...props}
                  page="main"
                  entries={this.props.entries}
                  journals={this.props.journals}
                  journal={this.state.journal}
                  month={this.state.month}
                  year={this.state.year}
                  tags={this.state.tags}
                />
              </>
            )}
          />
          <Route
            path="/journal/:journal_id/:journal_name"
            render={(props) => (
              <>
                <Sidebar
                  page="journal"
                  entries={this.props.entries}
                  journals={this.props.journals}
                  tags={this.state.tags}
                  addTags={this.addTags}
                  removeTags={this.removeTags}
                  handleFormChange={this.handleFormChange}
                  clearFilters={this.clearFilters}
                />
                <MainDisplay
                  {...props}
                  page="journal"
                  entries={this.props.entries}
                  journals={this.props.journals}
                  journal={this.state.journal}
                  month={this.state.month}
                  year={this.state.year}
                  tags={this.state.tags}
                />
              </>
            )}
          />
          <Route
            path="/new/journal"
            render={(props) => (
              <>
                <New {...props} />
              </>
            )}
          />
        </Router>
      </>
    );
  }
}
