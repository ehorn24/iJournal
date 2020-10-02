import React, { Component } from "react";
import { Link } from "react-router-dom";

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
    userInfo: [],
    journals: [],
    entries: [],
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
    authenticateUser(this.state.username, this.state.password).then((res) => {
      if (!res.error) {
        this.setLocalStorage("username", this.state.username);
        this.setLocalStorage("loggedIn", true);
        this.setState({ loggedIn: true, password: "", error: false }, () => {
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
      this.setLocalStorage("loggedIn", false);
      localStorage.setItem("username", "");
      localStorage.setItem("userInfo", "");
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
          this.setLocalStorage("username", this.state.username);
          this.setLocalStorage("loggedIn", true);
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
          />
        )}
      </div>
    );
  }
}
