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
        className="entry-div"
        onClick={(e) => {
          e.preventDefault();
          openEntryModal(id);
        }}
      >
        <div className="entry-info">
          <h3 className="entry-title">
            {title}{" "}
            <span className="entry-date">
              {month.slice(0, 2)}-{date.slice(0, 2)}-{year}
            </span>
          </h3>
          <p className="entry-tags">
            Tags:{" "}
            {tags && tags.length > 0
              ? tags.map((t, i) => {
                  return <span key={i}> {t} </span>;
                })
              : null}
          </p>
        </div>
        <button
          className="entry-delete-button"
          onClick={(e) => {
            e.preventDefault();
            handleDeleteEntry(id, journal);
          }}
        >
          X
        </button>
      </div>
    </>
  );
};

export default EntryDisplay;
