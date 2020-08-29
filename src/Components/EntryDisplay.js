import React from "react";

const EntryDisplay = ({ title, month, date, year, tags, openModal }) => {
  return (
    <div className="entry" onClick={(e) => openModal(e, title)}>
      <h3>{title}</h3>
      <p>
        {month} {date}, {year}
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
