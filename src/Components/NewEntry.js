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
    <div>
      <form action="" onChange={handleFormChange}>
        <div>
          <ul>
            <li>
              <label htmlFor="">Entry Title:</label>
              <input type="text" name="newEntryTitle" id="newEntryTitle" />
            </li>
            <li>
              <label htmlFor="">Tags:</label>
              <TagsInput
                tags={tags}
                addTags={addTags}
                removeTags={removeTags}
                onKeyPress={(e) => {
                  e.target.keyCode === 13 && e.preventDefault();
                }}
              />
            </li>
            <li>
              <label htmlFor="">Date:</label>
              <input
                type="text"
                name=""
                id=""
                readOnly="readonly"
                placeholder={new Date().toDateString()}
              />
            </li>
            <li>
              <label htmlFor="">Pour your heart out...</label>
              <textarea
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
