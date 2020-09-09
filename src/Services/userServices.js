const { API_BASE_URL } = require("../config");
const userURL = API_BASE_URL + "/users";

const userServices = {
  createNewUser(username, password, firstname, lastname) {
    return fetch(`${userURL}/`, {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
        firstname,
        lastname,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  },

  authenticateUser(username, password) {
    return fetch(`${userURL}/login`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  },

  getAllUsernames() {
    return fetch(`${userURL}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  },
};

module.exports = userServices;
