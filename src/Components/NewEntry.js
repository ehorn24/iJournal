import React from "react";
import TagsInput from "./TagsInput";

const NewEntry = ({
  handleFormChange,
  createNewEntry,
  journal_id,
  tags,
  addTags,
  removeTags,
}) => {
  return (
    <div className="new-entry-div">
      <form className="new-entry-form" onChange={handleFormChange}>
        <div>
          <ul>
            <li>
              <label htmlFor=""> Title</label>
              <input
                type="text"
                name="newEntryTitle"
                id="newEntryTitle"
                className="new-entry-input"
              />
            </li>
            <li>
              <label htmlFor="">Date</label>
              <input
                type="text"
                name=""
                id=""
                readOnly="readonly"
                placeholder={new Date().toDateString()}
                className="new-entry-input"
              />
            </li>
            <li>
              <label htmlFor="">Tags</label>
              <div className="new-entry-tags">
                <TagsInput
                  tags={tags}
                  addTags={addTags}
                  removeTags={removeTags}
                  onKeyPress={(e) => {
                    e.target.keyCode === 13 && e.preventDefault();
                  }}
                />
              </div>
            </li>
            <li>
              <label className="new-entry-text-label" htmlFor="">
                Pour your heart out...
              </label>
              <textarea
                className="new-entry-textarea"
                name="newEntryText"
                id="newEntryText"
                cols="30"
                rows="10"
                onKeyPress={(e) => {
                  e.target.keyCode === 13 && e.preventDefault();
                }}
              ></textarea>
            </li>
            <button
              className="add-entry-button"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                createNewEntry(journal_id);
              }}
            >
              Add Entry
            </button>
          </ul>
        </div>
      </form>
    </div>
  );
};

export default NewEntry;
