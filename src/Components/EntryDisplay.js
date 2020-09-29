import React from "react";

const EntryDisplay = ({
  title,
  month,
  date,
  year,
  tags,
  id,
  openEntryModal,
}) => {
  return (
    <div
      className="entry"
      onClick={(e) => {
        e.preventDefault();
        openEntryModal(id);
      }}
    >
      <h3>{title}</h3>
      <p>
        {month.slice(1, 2)}-{date.slice(1, 2)}-{year}
      </p>
      <p>
        Tags:{" "}
        {tags.map((t) => {
          return t + "/";
        })}
      </p>
    </div>
  );
};

export default EntryDisplay;
