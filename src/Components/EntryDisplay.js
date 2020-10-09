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
  confDelEntry,
  closeConfirmEntry,
  confirmDeleteEntry,
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

  const openConfirmation = (e) => {
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    confDelEntry();
  };

  return (
    <>
      <div
        className={
          confirmDeleteEntry
            ? "confirm-delete-entry show-confirm"
            : "confirm-delete-entry hide-confirm"
        }
      >
        <p>
          Are you sure you want to delete this entry? You can never get it
          back...
        </p>
        <button
          className="keep-entry"
          onClick={(e) => {
            e.preventDefault();
            closeConfirmEntry();
          }}
        >
          No, I'll keep it
        </button>
        <button
          className="delete-entry"
          onClick={(e) => {
            deleteEntry(e);
          }}
        >
          Yes, delete it
        </button>
      </div>
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
            openConfirmation(e);
          }}
        >
          &times;
        </button>
      </div>
    </>
  );
};

export default EntryDisplay;
