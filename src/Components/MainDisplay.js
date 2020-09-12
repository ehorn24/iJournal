import React from "react";
import { Link } from "react-router-dom";
import EntryDisplay from "./EntryDisplay";

const MainDisplay = ({
  page,
  journals,
  entries,
  journal,
  month,
  year,
  tags,
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

  switch (page) {
    //Main page - No journal selected
    case "main":
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
            let intersect = new Set(
              [...entrySet].filter((x) => tagsSet.has(x))
            );
            bool = (intersect.size === tagsSet.size) * bool;
          }
          return bool;
        });
      });

      //Display all journals if no entries selected
      if (Object.keys(currentFilters).length === 0) {
        return (
          <main className="maindisplay-main">
            <section className="my-journals">
              <h4 className="maindisplay-header">My Journals</h4>
              <Link to="/new/journal" className="addjournal-button">
                New +
              </Link>
              <div className="journals-flex">
                {journals.map((journal, i) => {
                  return (
                    <Link
                      to={`/journal/${journal.journal_name}`}
                      className="journal"
                      key={i}
                    >
                      {journal.journal_name}
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
                      />
                    );
                  })
                ) : (
                  <p>There were no matching entries</p>
                )}
              </div>
            </section>
          </main>
        );
      }
  }
};

export default MainDisplay;
