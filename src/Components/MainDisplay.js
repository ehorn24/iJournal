import React from "react";
import { Link } from "react-router-dom";
import { MockData } from "../Mock Data/MockData";
import { MockEntries } from "../Mock Data/MockEntries";
import EntryModal from "./EntryModal";
import EntryDisplay from "./EntryDisplay";

const MainDisplay = ({
  page,
  journal,
  month,
  year,
  tags,
  showEntryModal,
  openModal,
  closeModal,
  showEntry,
  match,
}) => {
  //Get user's selected filters (if any)
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

  //Main Page (no journal selected)
  switch (page) {
    case "Main":
      //Get entries that match selected filters
      getFilters(journal, month, year, tags);
      const matchingEntries = MockEntries.filter((ent) => {
        return Object.keys(currentFilters).every((k) => {
          let bool = true;
          if (typeof ent[k] === "string") {
            bool = (ent[k] === currentFilters[k]) * bool;
          } else {
            let entrySet = new Set(ent.tags.map((t) => t));
            let tagsSet = new Set(currentFilters[k]);
            let intersect = new Set(
              [...entrySet].filter((x) => tagsSet.has(x))
            );
            bool = (intersect.size === tagsSet.size) * bool;
          }
          return bool;
        });
      });

      //If no filters are selected, display all journals
      if (Object.keys(currentFilters).length === 0) {
        return (
          <main className="maindisplay-main">
            <section className="my-journals">
              <h4 className="maindisplay-header">My Journals</h4>
              <Link to="/new/journal" className="addjournal-button">
                New +
              </Link>
              <div className="journals-flex">
                {MockData.map((j, i) => {
                  return (
                    <Link
                      to={"/journal/" + j.journal_title}
                      className="journal"
                      key={i}
                    >
                      {j.journal_title}
                    </Link>
                  );
                })}
              </div>
            </section>
          </main>
        );

        //If user has selected filters
      } else {
        return (
          <main className="maindisplay-main">
            <section className="my-journals">
              <h4 className="maindisplay-header">
                Find what you're looking for?
              </h4>
              <div className="maindisplay-entries">
                {matchingEntries.length !== null &&
                matchingEntries.length !== 0 ? (
                  matchingEntries.map((x, i) => {
                    return (
                      <EntryDisplay
                        key={i}
                        title={x.entry_title}
                        month={x.month}
                        date={x.date}
                        year={x.year}
                        tags={x.tags}
                        openModal={openModal}
                      />
                    );
                  })
                ) : (
                  <p className="entry-error">
                    None of your entries matched those filters. Please try
                    again.
                  </p>
                )}
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

    //Journal Main Page (Journal selected)
    case "Journal":
      //Get user's selected filters
      getFilters(journal, month, year, tags);
      const matchEntries = MockEntries.filter((ent) => {
        return Object.keys(currentFilters).every((k) => {
          let bool = true;
          if (typeof ent[k] === "string") {
            bool = (ent[k] === currentFilters[k]) * bool;
          } else {
            let entrySet = new Set(ent.tags.map((t) => t));
            let tagsSet = new Set(currentFilters[k]);
            let intersect = new Set(
              [...entrySet].filter((x) => tagsSet.has(x))
            );
            bool = (intersect.size === tagsSet.size) * bool;
          }
          return bool;
        });
      });
      let allJournalEntries = [];

      //If no filters are selected
      if (Object.keys(currentFilters).length === 0) {
        MockEntries.forEach((x) => {
          if (x.journal === match.params.journalname) {
            allJournalEntries.push(x);
          }
        });
        return (
          <main className="maindisplay-main">
            <section className="my-journals">
              <h4 className="maindisplay-header">{match.params.journalname}</h4>
              <Link to="/new/entry" className="addjournal-button">
                New +
              </Link>
              <div className="maindisplay-entries">
                {allJournalEntries.map((x, i) => {
                  return (
                    <EntryDisplay
                      key={i}
                      title={x.entry_title}
                      month={x.month}
                      date={x.date}
                      year={x.year}
                      tags={x.tags}
                      openModal={openModal}
                    />
                  );
                })}
              </div>
            </section>
            <EntryModal
              showEntryModal={showEntryModal}
              closeModal={closeModal}
              showEntry={showEntry}
            />
          </main>
        );

        //If filters are selected
      } else {
        return (
          <main className="maindisplay-main">
            <section className="my-journals">
              <h4 className="maindisplay-header">
                Find what you're looking for?
              </h4>
              <div className="maindisplay-entries">
                {matchEntries.length !== null && matchEntries.length !== 0 ? (
                  matchEntries.map((x, i) => {
                    return (
                      <EntryDisplay
                        key={i}
                        title={x.entry_title}
                        month={x.month}
                        date={x.date}
                        year={x.year}
                        tags={x.tags}
                        openModal={openModal}
                      />
                    );
                  })
                ) : (
                  <p className="entry-error">
                    None of your entries matched those filters. Please try
                    again.
                  </p>
                )}
              </div>
            </section>
          </main>
        );
      }
    default:
      return page;
  }
};

export default MainDisplay;
