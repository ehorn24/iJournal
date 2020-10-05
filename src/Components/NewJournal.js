import React from "react";

const NewJournal = ({
  createNewJournal,
  handleFormChange,
  journalCover,
  journalError,
}) => {
  return (
    <div className="new-journal">
      <form action="" onChange={handleFormChange} className="new-journal-form">
        <ul>
          <li>
            <label htmlFor="">Name</label>
            <input type="text" name="newJournalName" id="newJournalName" />
          </li>
          {journalError ? <p>Journal name is required.</p> : null}
          <li>
            <label htmlFor="date">Date</label>
            <input
              type="text"
              name="journal-date"
              id="journal-date"
              readOnly="readonly"
              placeholder={new Date().toDateString()}
            />
          </li>
          <li>
            <label htmlFor="">Cover</label>
            <input type="text" name="newJournalCover" id="newJournalCover" />
            <p className="image-tip">
              *Please use a photo URL. Cover image is optional.
            </p>
          </li>
          <div
            className="journal-cover-preview"
            style={
              journalCover !== ""
                ? {
                    backgroundImage: `url(${journalCover})`,
                    backgroundSize: "cover",
                  }
                : { backgroundColor: "white" }
            }
          >
            <span className="preview-span">Cover Preview</span>
          </div>
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
