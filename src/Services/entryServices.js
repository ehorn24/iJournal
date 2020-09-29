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
  addNewEntry(user_id, journal, entry_title, tags, entry_text) {
    return fetch(`${entryURL}/u/${user_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        journal,
        entry_title,
        tags,
        entry_text,
      }),
    }).then((res) => res.json());
  },
  deleteEntry(entry_id) {
    return fetch(`${entryURL}/${entry_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};

module.exports = entryServices;
