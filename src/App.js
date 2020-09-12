import React, { Component } from "react";

//Components
import Landing from "./Components/Landing";
import {
  createNewUser,
  authenticateUser,
  getAllUsernames,
} from "./Services/userServices";
import Main from "./Components/Main";

export default class App extends Component {
  state = {
    loggedIn: false,
    error: false,
    signup: false,
    username: "",
    user_id: "",
    password: "",
    firstname: "",
    lastname: "",
    usernames: [],
  };

  componentDidMount() {
    getAllUsernames().then((usernames) => {
      this.setState({ usernames });
    });
    //If user is currently logged in, render Main Component
    if (typeof Storage !== undefined) {
      if (localStorage.getItem("loggedIn") === "true") {
        this.setState({ loggedIn: true });
      }
    }
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
      if (!res.error) {
        this.setState({ loggedIn: true, password: "", error: false }, () => {
          if (typeof Storage !== undefined) {
            localStorage.setItem("username", this.state.username);
            localStorage.setItem("loggedIn", true);
          }
        });
      } else {
        this.setState({ error: true });
        window.alert("Didn't authenticate");
      }
    });
  };

  //Log Out
  handleLogOut = (e) => {
    e.preventDefault();
    this.setState({ loggedIn: false, username: "" }, () => {
      if (typeof Storage !== undefined) {
        localStorage.setItem("loggedIn", false);
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
        this.setState({ loggedIn: true, password: "", error: false }, () => {
          if (typeof Storage !== undefined) {
            localStorage.setItem("username", this.state.username);
            localStorage.setItem("loggedIn", true);
          }
        });
      } else {
        this.setState({ error: true });
        window.alert("Account not created!");
      }
    });
  };

  render() {
    return (
      <div>
        {this.state.loggedIn ? (
          <>
            <Main />
            <button onClick={this.handleLogOut}>LOG OUT</button>
          </>
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
    );
  }
}
