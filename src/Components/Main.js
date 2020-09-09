import React, { Component } from "react";
import { getUserInfo } from "../Services/userServices";

export default class Main extends Component {
  state = {
    username: "",
    userInfo: [],
  };

  componentDidMount() {
    if (typeof Storage !== undefined) {
      if (localStorage.getItem("loggedIn") === "true") {
        this.setState({ username: localStorage.getItem("username") }, () => {
          getUserInfo(this.state.username).then((res) => {
            if (!res.error) {
              this.setState({ userInfo: res });
            }
          });
        });
      }
    }
  }

  render() {
    return (
      <div>
        <h1>This is the homepage when logged in.</h1>
      </div>
    );
  }
}
