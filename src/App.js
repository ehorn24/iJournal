import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Components
import Landing from "./Components/Landing";
import Home from "./Components/Home";

export default class App extends Component {
  state = {
    tags: [],
  };

  //Tags Input Functions
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
      <Router>
        <Switch>
          <Route exact path="/" render={(props) => <Landing {...props} />} />
          <Route
            exact
            path="/home"
            render={(props) => (
              <Home
                {...props}
                addTags={this.addTags}
                removeTags={this.removeTags}
                tags={this.state.tags}
              />
            )}
          />
        </Switch>
      </Router>
    );
  }
}
