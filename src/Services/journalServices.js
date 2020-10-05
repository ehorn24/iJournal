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

  addNewJournal(user_id, journal_name, journal_cover) {
    return fetch(`${journalURL}/u/${user_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        journal_name,
        journal_cover,
      }),
    }).then((res) => res.json());
  },

  editJournal(journal_id, journal_name, journal_cover) {
    return fetch(`${journalURL}/j/${journal_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        journal_name,
        journal_cover,
      }),
    });
  },
  deleteJournal(journal_id) {
    return fetch(`${journalURL}/j/${journal_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};

module.exports = journalServices;
