const { API_BASE_URL } = require("../config");
const entryURL = API_BASE_URL + "/entries";

const entryServices = {
  getUserEntries(user_id) {
    return fetch(`${entryURL}/u/${user_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  },
};

module.exports = entryServices;
