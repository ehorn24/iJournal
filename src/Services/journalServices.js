const { API_BASE_URL } = require("../config");
const journalURL = API_BASE_URL + "/journals";

const journalServices = {
  getUserJournals(user_id) {
    return fetch(`${journalURL}/u/${user_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  },
};

module.exports = journalServices;
