import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

//Components
import Landing from "./Components/Landing";
import {
  createNewUser,
  authenticateUser,
  getAllUsernames,
} from "./Services/userServices";

export default class App extends Component {
  state = {
    loggedIn: false,
    error: false,
    redirect: null,
    signup: false,
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    usernames: [],
  };

  componentDidMount() {
    getAllUsernames().then((usernames) => {
      this.setState({ usernames });
    });
  }

  handleFormChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  //Toggle log in or signup option
  changeLogIn = (e) => {
    e.preventDefault();
    this.setState({ signup: !this.state.signup });
  };

  //Log In
  handleLogIn = () => {
    authenticateUser(this.state.username, this.state.password).then((res) => {
      if (res === "ok") {
        this.setState({ loggedIn: true, password: "" }, () => {
          if (typeof Storage !== undefined) {
            localStorage.setItem("username", this.state.username);
            localStorage.setItem("loggedIn", true);
          }
        });
      } else {
        window.alert("Didn't authenticate");
      }
    });
  };

  //Sign Up
  handleSignUp = () => {
    createNewUser(
      this.state.username,
      this.state.password,
      this.state.firstname,
      this.state.lastname
    ).then((res) => {
      if (res === "ok") {
        this.setState({ loggedIn: true, password: "" }, () => {
          if (typeof Storage !== undefined) {
            localStorage.setItem("username", this.state.username);
            localStorage.setItem("loggedIn", true);
          }
        });
      } else {
        window.alert("Account not created!");
      }
    });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <Router>
        <Route
          exact
          path="/"
          render={(props) => (
            <div>
              {this.state.loggedIn ? (
                <h3>Logged in!</h3>
              ) : (
                <Landing
                  page={this.state.signup ? "signup" : "login"}
                  changeLogIn={this.changeLogIn}
                  handleFormChange={this.handleFormChange}
                  handleLogIn={this.handleLogIn}
                  handleSignUp={this.handleSignUp}
                  existingUsernames={this.state.usernames}
                  username={this.state.username}
                />
              )}
            </div>
          )}
        />
      </Router>
    );
  }
}
