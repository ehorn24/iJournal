import React from "react";

const New = ({ match }) => {
  let [month, date, year] = new Date().toLocaleDateString().split("/");
  switch (match.params.type) {
    case "journal":
      return (
        <main className="add-main">
          <h3 className="add-header">New {match.params.type}</h3>
          <p>For the static version, this page has no real functionality.</p>
          <form className="add-form">
            <ul>
              <li>
                <label htmlFor="new-name">Journal name:</label>
                <input type="text" name="journal-name" id="journal-name" />
              </li>
              <li>
                <label htmlFor="new-date">Date created:</label>
                <input
                  type="text"
                  name="journal-date"
                  id="journal-date"
                  readOnly="readonly"
                  value={month + "/" + date + "/" + year}
                />
              </li>
              <li>
                <label htmlFor="new-tags">Tags:</label>
                <input
                  type="text"
                  name=""
                  id=""
                  readOnly="readonly"
                  value="Tags go here"
                />
              </li>
            </ul>
            <button>Add</button>
          </form>
        </main>
      );
    case "entry":
      return (
        <main className="add-main">
          <h3 className="add-header">New {match.params.type}</h3>
          <p>For the static version, this page has no real functionality.</p>
          <form className="add-form">
            <ul>
              <li>
                <label htmlFor="new-name">Journal name:</label>
                <input
                  type="text"
                  name="journal-name"
                  id="journal-name"
                  readOnly="readonly"
                  value="Journal"
                />
              </li>
              <li>
                <label htmlFor="new-date">Date created:</label>
                <input
                  type="text"
                  name="journal-date"
                  id="journal-date"
                  readOnly="readonly"
                  value={month + "/" + date + "/" + year}
                />
              </li>
              <li>
                <label htmlFor="new-tags">Tags:</label>
                <input
                  type="text"
                  name=""
                  id=""
                  readOnly="readonly"
                  value="Tags go here"
                />
              </li>
              <li>
                <label htmlFor="">Entry:</label>
                <textarea name="" id="" cols="30" rows="10"></textarea>
              </li>
            </ul>
            <button>Add</button>
          </form>
        </main>
      );
    default:
      return null;
  }
};

export default New;
