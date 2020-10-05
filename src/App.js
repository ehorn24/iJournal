import React, { Component } from "react";

//Components
import Landing from "./Components/Landing";
import {
  createNewUser,
  authenticateUser,
  getAllUsernames,
  getUserInfo,
} from "./Services/userServices";
import { getUserJournals } from "./Services/journalServices";
import { getUserEntries } from "./Services/entryServices";
import Main from "./Components/Main";
import { Redirect } from "react-router-dom";

export default class App extends Component {
  state = {
    loggedIn: false,
    loginError: false,
    signupError: false,
    signup: false,
    username: "",
    user_id: "",
    password: "",
    firstname: "",
    lastname: "",
    usernames: [],
    userInfo: null,
    journals: [],
    entries: [],
    redirectTo: null,
  };

  componentDidMount() {
    getAllUsernames().then((usernames) => {
      this.setState({ usernames });
    });
    //If user is currently logged in, render Main Component
    if (
      typeof Storage !== undefined &&
      localStorage.getItem("loggedIn") === "true"
    ) {
      this.setState(
        {
          loggedIn: true,
          username: localStorage.getItem("username"),
          userInfo: JSON.parse(localStorage.getItem("userInfo")),
        },
        () => {
          if (this.state.userInfo && this.state.userInfo.id) {
            getUserJournals(this.state.userInfo.id).then((res) => {
              if (!res.error) {
                this.setLocalStorage("journals", JSON.stringify(res));
                this.setState({ journals: res });
              }
            });
            getUserEntries(this.state.userInfo.id).then((res) => {
              if (!res.error) {
                this.setLocalStorage("entries", res);
                this.setState({ entries: res });
              }
            });
          }
        }
      );
    }
  }

  handleFormChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  setLocalStorage = (key, value) => {
    if (typeof Storage !== undefined) {
      localStorage.setItem(key, value);
    }
  };

  //Toggle log in or signup option
  changeLogIn = (e) => {
    e.preventDefault();
    this.setState({ signup: !this.state.signup });
  };

  //Log In
  handleLogIn = () => {
    if (
      this.state.username === "" ||
      this.state.username === null ||
      this.state.password === "" ||
      this.state.password === null
    ) {
      this.setState({ loginError: "missingfield" });
    } else {
      authenticateUser(
        this.state.username.toLowerCase(),
        this.state.password
      ).then((res) => {
        if (!res.error) {
          this.setLocalStorage("username", this.state.username.toLowerCase());
          this.setLocalStorage("loggedIn", true);
          this.setState(
            { loggedIn: true, password: "", loginError: false },
            () => {
              getUserInfo(this.state.username).then((res) => {
                if (!res.error) {
                  this.setLocalStorage("userInfo", JSON.stringify(res));
                  this.setState({ userInfo: res }, () => {
                    if (this.state.userInfo && this.state.userInfo.id) {
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
                    }
                  });
                }
              });
            }
          );
        } else {
          this.setState({ loginError: "invalid" });
        }
      });
    }
  };

  //Log Out
  handleLogOut = (e) => {
    e.preventDefault();
    this.setState({ loggedIn: false, username: "", redirectTo: "/" }, () => {
      this.setLocalStorage("loggedIn", false);
      localStorage.setItem("username", "");
      localStorage.setItem("userInfo", "");
      this.setState({ redirectTo: null });
    });
  };

  //Sign Up
  handleSignUp = () => {
    if (
      this.state.username === "" ||
      this.state.password === "" ||
      this.state.firstname === "" ||
      this.state.lastname === ""
    ) {
      this.setState({ signupError: true });
    } else {
      createNewUser(
        this.state.username.toLowerCase(),
        this.state.password,
        this.state.firstname,
        this.state.lastname
      ).then((userInfo) => {
        if (userInfo && userInfo.id) {
          this.setState(
            { loggedIn: true, password: "", signupError: false, userInfo },
            () => {
              this.setLocalStorage(
                "username",
                this.state.username.toLowerCase()
              );
              this.setLocalStorage("loggedIn", true);
            }
          );
        }
      });
    }
  };

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />;
    }
    return (
      <div>
        {this.state.loggedIn &&
        this.state.userInfo &&
        this.state.userInfo.id ? (
          <Main
            userInfo={this.state.userInfo}
            journals={this.state.journals}
            entries={this.state.entries}
            setParentState={(obj) => this.setState(obj)}
            handleLogOut={this.handleLogOut}
          />
        ) : (
          <Landing
            page={this.state.signup ? "signup" : "login"}
            changeLogIn={this.changeLogIn}
            handleFormChange={this.handleFormChange}
            handleLogIn={this.handleLogIn}
            handleSignUp={this.handleSignUp}
            existingUsernames={this.state.usernames}
            username={this.state.username}
            loginError={this.state.loginError}
            signupError={this.state.signupError}
          />
        )}
      </div>
    );
  }
}
