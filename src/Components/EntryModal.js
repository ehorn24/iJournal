import React from "react";
import { MockEntries } from "../Mock Data/MockEntries";

const EntryModal = ({ showEntryModal, closeModal, showEntry }) => {
  const entry = MockEntries.filter((x) => x.entry_title === showEntry);
  let journal = "";
  let title = "";
  let date = "";
  let month = "";
  let year = "";
  let tags = [];
  let text = "";
  entry.forEach((e) => {
    journal = e.journal;
    title = e.entry_title;
    date = e.date;
    month = e.month;
    year = e.year;
    tags = e.tags;
    text = e.entry_text;
  });
  return (
    <div className={showEntryModal ? "modal show-entry" : "modal hide-entry"}>
      <button className="modal-close" onClick={closeModal}>
        X
      </button>
      <div className="modal-page">
        <h1 className="entry-title">{title}</h1>
        <div className="journal-date-div">
          <h4 className="entry-journal">{journal}</h4>
          <h4 className="entry-date">
            {month} {date}, {year}
          </h4>
        </div>
        <ul className="entry-tagslist">
          {tags.map((t, i) => {
            return <li key={i}>{t}</li>;
          })}
        </ul>
        <div className="entry-text-div">
          <p className="entry-text">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default EntryModal;
