import React from "react";
import { Link } from "react-router-dom";
import { MockData } from "../Mock Data/MockData";
import { MockEntries } from "../Mock Data/MockEntries";
import EntryModal from "./EntryModal";

const MainDisplay = ({
  journal,
  month,
  year,
  tags,
  showEntryModal,
  openModal,
  closeModal,
  showEntry,
}) => {
  //get selected filters
  let currentFilters = {};
  const getFilters = (journal, month, year, tags) => {
    if (journal !== "") {
      currentFilters.journal = journal;
    }
    if (month !== "") {
      currentFilters.month = month;
    }
    if (year !== "") {
      currentFilters.year = year;
    }
    if (tags.length !== 0) {
      currentFilters.tags = tags;
    }
    return currentFilters;
  };
  getFilters(journal, month, year, tags);

  const matchingEntries = MockEntries.filter((ent) => {
    return Object.keys(currentFilters).every((k) => {
      let bool = true;
      if (typeof ent[k] === "string") {
        bool = (ent[k] === currentFilters[k]) * bool;
      } else {
        let entrySet = new Set(ent.tags.map((t) => t));
        let tagsSet = new Set(currentFilters[k]);
        let intersect = new Set([...entrySet].filter((x) => tagsSet.has(x)));
        bool = (intersect.size === tagsSet.size) * bool;
      }
      return bool;
    });
  });

  if (Object.keys(currentFilters).length === 0) {
    return (
      <main className="maindisplay-main">
        <section className="my-journals">
          <h4 className="maindisplay-header">My Journals</h4>
          <div className="journals-flex">
            {MockData.map((j, i) => {
              return (
                <Link to={"/" + j.journal_title} className="journal" key={i}>
                  {j.journal_title}
                </Link>
              );
            })}
          </div>
        </section>
        <EntryModal showEntryModal={showEntryModal} closeModal={closeModal} />
      </main>
    );
  } else {
    return (
      <main className="maindisplay-main">
        <section className="my-journals">
          <h4 className="maindisplay-header">Looking for one of these?</h4>
          <div className="maindisplay-entries">
            {matchingEntries.length !== null
              ? matchingEntries.map((m, i) => {
                  return (
                    <div
                      className="entry"
                      key={i}
                      onClick={(e) => openModal(e, m.entry_title)}
                    >
                      <h3>{m.entry_title}</h3>
                      <p>
                        {m.month} {m.date}, {m.year}
                      </p>
                      <p>
                        Tags:{" "}
                        {m.tags.map((t) => {
                          return t + "/";
                        })}
                      </p>
                    </div>
                  );
                })
              : "Didn't work"}
          </div>
        </section>
        <EntryModal
          showEntryModal={showEntryModal}
          closeModal={closeModal}
          showEntry={showEntry}
        />
      </main>
    );
  }
};

export default MainDisplay;
