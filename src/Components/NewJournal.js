import React from "react";

const NewJournal = ({ createNewJournal, handleFormChange }) => {
  return (
    <div>
      <form action="" onChange={handleFormChange}>
        <div className="journal-cover-preview">Journal Cover Image</div>
        <ul>
          <li>
            <label htmlFor="">Journal cover:</label>
            <input type="text" name="newJournalCover" id="newJournalCover" />
            <p className="image-tip">*Please use a photo URL</p>
          </li>
          <li>
            <label htmlFor="">Journal name:</label>
            <input type="text" name="newJournalName" id="newJournalName" />
          </li>
          <li>
            <label htmlFor="date">Date created:</label>
            <input
              type="text"
              name="journal-date"
              id="journal-date"
              readOnly="readonly"
              placeholder={new Date().toDateString()}
            />
          </li>
          <button
            className="new-journal-button"
            onClick={(e) => {
              e.preventDefault();
              createNewJournal();
            }}
          >
            Create Journal
          </button>
        </ul>
      </form>
    </div>
  );
};

export default NewJournal;
