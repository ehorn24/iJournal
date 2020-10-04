import React from "react";

const EntryDisplay = ({
  title,
  month,
  date,
  year,
  tags,
  id,
  journal,
  openEntryModal,
  handleDeleteEntry,
}) => {
  return (
    <>
      <div
        className="entry"
        onClick={(e) => {
          e.preventDefault();
          openEntryModal(id);
        }}
      >
        <h3>{title}</h3>
        <p>
          {month.slice(0, 2)}-{date.slice(0, 2)}-{year}
        </p>
        <p>
          Tags:{" "}
          {tags && tags.length > 0
            ? tags.map((t) => {
                return t + "/";
              })
            : null}
        </p>
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          handleDeleteEntry(id, journal);
        }}
      >
        Delete
      </button>
    </>
  );
};

export default EntryDisplay;
