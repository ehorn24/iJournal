import React from "react";

const New = () => {
  return (
    <main className="new-journal-main">
      <h2>Create a new journal</h2>
      <form action="">
        <div className="journal-cover-preview">Journal cover image</div>
        <ul>
          <li>
            <label htmlFor="journal-image">Journal cover:</label>
            <input type="text" name="journal-image" id="journal-image" />
            <p className="image-tip">*Please use a photo URL</p>
          </li>
          <li>
            <label htmlFor="name">Journal name:</label>
            <input type="text" name="journal-name" id="journal-name" />
          </li>
          <li>
            <label htmlFor="date">Date created:</label>
            <input
              type="text"
              name="journal-date"
              id="journal-date"
              disabled
              placeholder={new Date().toDateString()}
            />
          </li>
          <button className="new-journal-button">Create Journal</button>
        </ul>
      </form>
    </main>
  );
};

export default New;
