import React from "react";
import { Link } from "react-router-dom";
import EntryDisplay from "./EntryDisplay";
import EntryModal from "./EntryModal";

const MainDisplay = ({
  page,
  journals,
  entries,
  journal,
  month,
  year,
  tags,
  match,
  openEntryModal,
  closeEntryModal,
  entryModal,
  entryToShow,
  handleDeleteEntry,
  handleDeleteJournal,
}) => {
  //Get user's selected filters, if any
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

  let entriesArr = [];
  const modifyEntries = (arr) => {
    arr.forEach((a) => {
      let obj = {};
      obj.id = a.id;
      obj.journal = a.journal.toString();
      obj.entry_title = a.entry_title;
      obj.month = a.date_created.slice(5, 7);
      obj.year = a.date_created.slice(0, 4);
      obj.date = a.date_created.slice(8, 10);
      obj.tags = a.tags;
      obj.entry_text = a.entry_text;
      entriesArr.push(obj);
    });
    return entriesArr;
  };
  modifyEntries(entries);

  //Filter entries
  getFilters(journal, month, year, tags);
  const mEntries = entriesArr.filter((entry) => {
    return Object.keys(currentFilters).every((k) => {
      let bool = true;
      if (typeof entry[k] === "string") {
        bool = (entry[k] === currentFilters[k]) * bool;
      } else {
        let entrySet = new Set(
          entry.tags.map((t) => {
            return t;
          })
        );
        let tagsSet = new Set(currentFilters[k]);
        let intersect = new Set([...entrySet].filter((x) => tagsSet.has(x)));
        bool = (intersect.size === tagsSet.size) * bool;
      }
      return bool;
    });
  });

  switch (page) {
    //Main page - No journal selected
    case "main":
      //Display all journals if no entries selected
      if (Object.keys(currentFilters).length === 0) {
        return (
          <div className="maindisplay-div">
            <main className="maindisplay-main">
              <section className="my-journals">
                <h4 className="maindisplay-header">My Journals</h4>
                <Link to="/new/journal" className="addjournal-button">
                  New +
                </Link>
                <div className="journals-flex">
                  {journals.length > 0 ? (
                    journals.map((journal, i) => {
                      return (
                        <Link
                          to={`/journal/${journal.id}/${journal.journal_name}`}
                          className="journal"
                          key={i}
                          style={
                            journal.journal_cover !== null
                              ? {
                                  backgroundImage: `url(${journal.journal_cover})`,
                                  backgroundSize: "cover",
                                }
                              : { background: "white" }
                          }
                        >
                          <span className="journal-title">
                            {journal.journal_name}
                          </span>
                        </Link>
                      );
                    })
                  ) : (
                    <p className="no-journals-message">
                      You haven't created any journals yet. Click the New button
                      to get started!
                    </p>
                  )}
                </div>
              </section>
            </main>
          </div>
        );
        //If user has selected filters
      } else {
        return (
          <div className="maindisplay-div">
            <main className="maindisplay-main">
              <section className="my-journals">
                <h4 className="maindisplay-header">
                  Find what you're looking for?
                </h4>
                <div className="maindisplay-entries">
                  {mEntries.length !== null && mEntries.length !== 0 ? (
                    mEntries.map((x, i) => {
                      return (
                        <EntryDisplay
                          key={i}
                          title={x.entry_title}
                          month={x.month}
                          date={x.date}
                          year={x.year}
                          tags={x.tags}
                          id={x.id}
                          journal={x.journal}
                          openEntryModal={openEntryModal}
                          handleDeleteEntry={handleDeleteEntry}
                        />
                      );
                    })
                  ) : (
                    <p className="no-entries">
                      ...If not, please try different filters.
                    </p>
                  )}
                </div>
              </section>
              <EntryModal
                entryModal={entryModal}
                entryToShow={entryToShow}
                closeEntryModal={closeEntryModal}
              />
            </main>
          </div>
        );
      }
    case "journal":
      //Get all entries in this journal
      let journalEntries = entriesArr.filter((ent) => {
        return ent.journal === match.params.journal_id;
      });
      //Display all entries in selected journal if no filters are selected
      if (Object.keys(currentFilters).length === 0) {
        return (
          <div className="maindisplay-div">
            <main className="maindisplay-main">
              <section className="my-journals">
                <label className="dropdown-container">
                  <input type="checkbox" />
                  <span>•••</span>
                  <span className="dropdown-menu">
                    <Link to={`/edit/journal/${match.params.journal_id}`}>
                      Edit Journal
                    </Link>
                    <Link to={`/new/entry/${match.params.journal_id}`}>
                      New Entry
                    </Link>
                    <span
                      onClick={(e) => {
                        e.preventDefault();
                        handleDeleteJournal(match.params.journal_id);
                      }}
                      className="delete-journal-span"
                    >
                      Delete Journal
                    </span>
                  </span>
                </label>
                <h4 className="maindisplay-header">
                  {match.params.journal_name}
                </h4>

                <div className="maindisplay-entries">
                  {journalEntries.length === 0 ? (
                    <h3 className="no-entries">
                      This journal doesn't have any entries yet. Add one!
                    </h3>
                  ) : (
                    journalEntries.map((x, i) => {
                      return (
                        <EntryDisplay
                          key={i}
                          title={x.entry_title}
                          month={x.month}
                          date={x.date}
                          year={x.year}
                          tags={x.tags}
                          id={x.id}
                          journal={x.journal}
                          openEntryModal={openEntryModal}
                          handleDeleteEntry={handleDeleteEntry}
                        />
                      );
                    })
                  )}
                </div>
              </section>
              <EntryModal
                entryModal={entryModal}
                entryToShow={entryToShow}
                closeEntryModal={closeEntryModal}
              />
            </main>
          </div>
        );
        //If user has selected filters, display matching entries
      } else {
        return (
          <main className="maindisplay-main">
            <section className="my-journals">
              <h4 className="maindisplay-header">
                Find what you're looking for?
              </h4>
              <div className="maindisplay-entries">
                {mEntries.length !== null && mEntries.length !== 0 ? (
                  mEntries.map((x, i) => {
                    if (x.journal === match.params.journal_id) {
                      return (
                        <EntryDisplay
                          key={i}
                          title={x.entry_title}
                          month={x.month}
                          date={x.date}
                          year={x.year}
                          tags={x.tags}
                          id={x.id}
                          journal={x.journal}
                          openEntryModal={openEntryModal}
                          handleDeleteEntry={handleDeleteEntry}
                        />
                      );
                    }
                    return null;
                  })
                ) : (
                  <p className="no-entries">
                    ...If not, please try different filters.
                  </p>
                )}
              </div>
            </section>
            <EntryModal
              entryModal={entryModal}
              entryToShow={entryToShow}
              closeEntryModal={closeEntryModal}
            />
          </main>
        );
      }
    default:
      return <h1>Default case</h1>;
  }
};

export default MainDisplay;
