import React, { Component } from "react";
import { getUserInfo } from "../Services/userServices";
import { getUserJournals } from "../Services/journalServices";
import { getUserEntries } from "../Services/entryServices";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MainDisplay from "./MainDisplay";

export default class Main extends Component {
  state = {
    username: "",
    userInfo: [],
    journals: [],
    entries: [],
    tags: [],
    journal: "",
    month: "",
    year: "",
  };

  componentDidMount() {
    if (typeof Storage !== undefined) {
      if (localStorage.getItem("loggedIn") === "true") {
        this.setState({ username: localStorage.getItem("username") }, () => {
          getUserInfo(this.state.username).then((res) => {
            if (!res.error) {
              this.setState({ userInfo: res }, () => {
                getUserJournals(this.state.userInfo.id).then((res) => {
                  if (!res.error) {
                    this.setState({ journals: res });
                  }
                });
                getUserEntries(this.state.userInfo.id).then((res) => {
                  if (!res.error) {
                    this.setState({ entries: res });
                  }
                });
              });
            }
          });
        });
      }
    }
  }

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

  //Tags
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
          <Route
            exact
            path="/"
            render={(props) => (
              <>
                <Header user={this.state.userInfo.firstname} />
                <Sidebar
                  page="main"
                  entries={this.state.entries}
                  journals={this.state.journals}
                  tags={this.state.tags}
                  addTags={this.addTags}
                  removeTags={this.deleteTags}
                  handleFormChange={this.handleFormChange}
                  clearFilters={this.clearFilters}
                />
                <MainDisplay
                  {...props}
                  page="main"
                  entries={this.state.entries}
                  journals={this.state.journals}
                  journal={this.state.journal}
                  month={this.state.month}
                  year={this.state.year}
                  tags={this.state.tags}
                />
              </>
            )}
          />
        </Router>
      </>
    );
  }
}
