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
  journalCover,
  editJournalCover,
  journalError,
  entryError,
}) => {
  const { type, id } = match.params;

  switch (action) {
    case "new":
      return (
        <main className="new-journal-main">
          <h2 className="new-header">
            Create a new {type === "journal" ? "journal!" : "entry!"}
          </h2>
          {type === "journal" ? (
            <NewJournal
              createNewJournal={createNewJournal}
              handleFormChange={handleFormChange}
              journalCover={journalCover}
              journalError={journalError}
            />
          ) : (
            <NewEntry
              handleFormChange={handleFormChange}
              createNewEntry={createNewEntry}
              journal_id={id}
              tags={tags}
              addTags={addTags}
              removeTags={removeTags}
              entryError={entryError}
            />
          )}
        </main>
      );
    case "edit":
      return (
        <main className="new-journal-main">
          <h2 className="new-header">Edit Journal</h2>
          <form
            className="edit-journal-form"
            action=""
            onChange={handleFormChange}
            onSubmit={(e) => {
              e.preventDefault();
              editJournalItem(match.params.id);
            }}
          >
            <ul>
              <li>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="editJournalName"
                  id="editJournalName"
                />
              </li>
              <li>
                <label htmlFor="journal-image">Cover</label>
                <input
                  type="text"
                  name="editJournalCover"
                  id="editJournalCover"
                />
                <p className="image-tip">*Please use a photo URL</p>
              </li>
              <div
                className="journal-cover-preview"
                style={
                  editJournalCover !== ""
                    ? {
                        backgroundImage: `url(${editJournalCover})`,
                        backgroundSize: "cover",
                      }
                    : { backgroundColor: "white" }
                }
              >
                <span className="preview-span">Cover Preview</span>
              </div>
              <button className="edit-journal-button">Submit Changes</button>
            </ul>
          </form>
        </main>
      );
    default:
      return null;
  }
};

export default New;
