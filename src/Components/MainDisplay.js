import React from "react";
import { Link } from "react-router-dom";
import { MockData } from "../Mock Data/MockData";
import { MockEntries } from "../Mock Data/MockEntries";
import EntryModal from "./EntryModal";

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
  //Main Page (no journal selected)
  switch (page) {
    case "Main":
      //Find entries that match selected filters
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
      if (Object.keys(currentFilters).length === 0) {
        return (
          <main className="maindisplay-main">
            <section className="my-journals">
              <h4 className="maindisplay-header">My Journals</h4>
              <div className="journals-flex">
                {MockData.map((j, i) => {
                  return (
                    <Link
                      to={"/" + j.journal_title}
                      className="journal"
                      key={i}
                    >
                      {j.journal_title}
                    </Link>
                  );
                })}
              </div>
            </section>
            <EntryModal
              showEntryModal={showEntryModal}
              closeModal={closeModal}
            />
          </main>
        );
      } else {
        return (
          <main className="maindisplay-main">
            <section className="my-journals">
              <h4 className="maindisplay-header">
                Find what you're looking for?
              </h4>
              <div className="maindisplay-entries">
                {matchingEntries.length !== null
                  ? matchingEntries.map((x, i) => {
                      return (
                        <div
                          className="entry"
                          key={i}
                          onClick={(e) => openModal(e, x.entry_title)}
                        >
                          <h3>{x.entry_title}</h3>
                          <p>
                            {x.month} {x.date}, {x.year}
                          </p>
                          <p>
                            Tags:{" "}
                            {x.tags.map((t) => {
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
    //Journal Main Page (Journal selected)
    case "Journal":
      getFilters(journal, month, year, tags);
      let allJournalEntries = [];
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
      if (Object.keys(currentFilters).length === 0) {
        MockEntries.forEach((x) => {
          if (x.journal === match.params.journalname) {
            allJournalEntries.push(x);
          }
        });
        return (
          <main className="maindisplay-main">
            <section className="my-journals">
              <div className="maindisplay-entries">
                {allJournalEntries.map((x, i) => {
                  return (
                    <div
                      className="entry"
                      key={i}
                      onClick={(e) => openModal(e, x.entry_title)}
                    >
                      <h3>{x.entry_title}</h3>
                      <p>
                        {x.month} {x.date}, {x.year}
                      </p>
                      <p>
                        Tags:{" "}
                        {x.tags.map((t) => {
                          return t + "/";
                        })}
                      </p>
                    </div>
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
      } else {
        return (
          <main className="maindisplay-main">
            <section className="my-journals">
              <h4 className="maindisplay-header">
                Find what you're looking for?
              </h4>
              <div className="maindisplay-entries">
                {matchEntries.length !== null
                  ? matchEntries.map((x, i) => {
                      return (
                        <div className="entry" key={i}>
                          <h3>{x.entry_title}</h3>
                          <p>
                            {x.month} {x.date}, {x.year}
                          </p>
                          <p>
                            Tags:{" "}
                            {x.tags.map((t) => {
                              return t + "/";
                            })}
                          </p>
                        </div>
                      );
                    })
                  : "Didn't work"}
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
