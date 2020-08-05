import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Components
import Landing from "./Components/Landing";
import Home from "./Components/Home";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={(props) => <Landing {...props} />} />
          <Route exact path="/home" render={(props) => <Home {...props} />} />
        </Switch>
      </Router>
    );
  }
}
