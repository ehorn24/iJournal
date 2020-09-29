import React from "react";
import NewJournal from "./NewJournal";
import NewEntry from "./NewEntry";

const New = ({
  handleFormChange,
  createNewJournal,
  action,
  editJournalItem,
  match,
  createNewEntry,
  tags,
  addTags,
  removeTags,
}) => {
  const { type, id } = match.params;

  switch (action) {
    case "new":
      return (
        <main className="new-journal-main">
          <h2>Create a new {type === "journal" ? "Journal" : "Entry"}</h2>
          {type === "journal" ? (
            <NewJournal
              createNewJournal={createNewJournal}
              handleFormChange={handleFormChange}
            />
          ) : (
            <NewEntry
              handleFormChange={handleFormChange}
              createNewEntry={createNewEntry}
              journal_id={id}
              tags={tags}
              addTags={addTags}
              removeTags={removeTags}
            />
          )}
        </main>
      );
    case "edit":
      return (
        <main className="new-journal-main">
          <h2>Edit Journal</h2>
          <form
            action=""
            onChange={handleFormChange}
            onSubmit={(e) => {
              e.preventDefault();
              editJournalItem(match.params.id);
            }}
          >
            <div className="journal-cover-preview">Journal cover image</div>
            <ul>
              <li>
                <label htmlFor="journal-image">Journal cover:</label>
                <input
                  type="text"
                  name="editJournalCover"
                  id="editJournalCover"
                />
                <p className="image-tip">*Please use a photo URL</p>
              </li>
              <li>
                <label htmlFor="name">Journal name:</label>
                <input
                  type="text"
                  name="editJournalName"
                  id="editJournalName"
                />
              </li>

              <button className="new-journal-button">Submit Changes</button>
            </ul>
          </form>
        </main>
      );
    default:
      return null;
  }
};

export default New;
