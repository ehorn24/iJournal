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
  const openEntry = (e) => {
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    openEntryModal(id);
  };

  const deleteEntry = (e) => {
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    handleDeleteEntry(id, journal);
  };

  return (
    <>
      <div
        className="entry-div"
        onClick={(e) => {
          openEntry(e);
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
            deleteEntry(e);
          }}
        >
          &times;
        </button>
      </div>
    </>
  );
};

export default EntryDisplay;
