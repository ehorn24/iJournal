import React from "react";

const EntryModal = ({ entryModal, entryToShow, closeEntryModal }) => {
  return (
    <div className={entryModal ? "modal show-entry" : "modal hide-entry"}>
      <button className="modal-close" onClick={closeEntryModal}>
        X
      </button>
      <div className="modal-page">
        {entryToShow ? (
          <>
            <h1 className="entry-title">{entryToShow[0].entry_title}</h1>

            <div className="journal-date-div">
              <h4 className="entry-date">
                {`${entryToShow[0].date_created.slice(
                  5,
                  7
                )}-${entryToShow[0].date_created.slice(
                  8,
                  10
                )}-${entryToShow[0].date_created.slice(0, 4)}`}
              </h4>
            </div>
            <ul className="entry-tagslist">
              {entryToShow[0].tags.map((t, i) => {
                return <li key={i}>{t}</li>;
              })}
            </ul>
            <div className="entry-text-div">
              <p className="entry-text">{entryToShow[0].entry_text}</p>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default EntryModal;
