import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./Components/Landing";

//Components

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={(props) => <Landing />} />
        </Switch>
      </Router>
    );
  }
}
