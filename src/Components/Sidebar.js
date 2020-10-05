import React from "react";
import TagsInput from "./TagsInput";

const Sidebar = ({
  page,
  entries,
  journals,
  tags,
  addTags,
  removeTags,
  handleFormChange,
  clearFilters,
}) => {
  let years = new Set();
  entries.forEach((ent) => {
    let sliceYear = ent.date_created.slice(0, 4);
    years.add(sliceYear);
  });
  years = [...years];
  switch (page) {
    case "main":
      return (
        <div className="sidebar">
          <h4 className="sidebar-header">Filter for entries</h4>
          <form
            className="sidebar-form"
            onChange={handleFormChange}
            onSubmit={(e) => e.preventDefault()}
            onReset={clearFilters}
          >
            <ul className="sidebar-ul">
              <li className="sidebar-li">
                <label htmlFor="filterby-journal" className="sidebar-label">
                  Journal
                </label>
                <select name="journal" id="journal" className="sidebar-select">
                  <option value=""></option>
                  {journals.length > 0
                    ? journals.map((j, i) => {
                        return (
                          <option value={j.id} key={i}>
                            {j.journal_name}
                          </option>
                        );
                      })
                    : null}
                </select>
              </li>
              <li className="sidebar-li">
                <label htmlFor="filterby-month" className="sidebar-label">
                  Month
                </label>
                <select name="month" id="month" className="sidebar-select">
                  <option value=""></option>
                  <option value="01">January</option>
                  <option value="02">February</option>
                  <option value="03">March</option>
                  <option value="04">April</option>
                  <option value="05">May</option>
                  <option value="06">June</option>
                  <option value="07">July</option>
                  <option value="08">August</option>
                  <option value="09">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
              </li>
              <li className="sidebar-li">
                <label htmlFor="filterby-year" className="sidebar-label">
                  Year
                </label>
                <select name="year" id="year" className="sidebar-select">
                  <option value=""></option>
                  {years.length > 0
                    ? years.map((year, i) => {
                        return (
                          <option value={year} key={i}>
                            {year}
                          </option>
                        );
                      })
                    : null}
                </select>
              </li>
              <li className="sidebar-li tags-li">
                <label htmlFor="filterby-tags" className="sidebar-label">
                  Tags
                </label>
                <div className="tagsinput-div">
                  <TagsInput
                    addTags={addTags}
                    removeTags={removeTags}
                    tags={tags}
                  />
                </div>
              </li>
            </ul>
            <input type="reset" value="Clear" className="sidebar-button" />
          </form>
        </div>
      );
    case "journal":
      return (
        <div className="sidebar">
          <h4 className="sidebar-header">Filter for entries</h4>
          <form
            className="sidebar-form"
            onChange={handleFormChange}
            onSubmit={(e) => e.preventDefault()}
            onReset={clearFilters}
          >
            <ul className="sidebar-ul">
              <li className="sidebar-li">
                <label htmlFor="filterby-month" className="sidebar-label">
                  Month:
                </label>
                <select name="month" id="month" className="sidebar-select">
                  <option value=""></option>
                  <option value="01">January</option>
                  <option value="02">February</option>
                  <option value="03">March</option>
                  <option value="04">April</option>
                  <option value="05">May</option>
                  <option value="06">June</option>
                  <option value="07">July</option>
                  <option value="08">August</option>
                  <option value="09">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
              </li>
              <li className="sidebar-li">
                <label htmlFor="filterby-year" className="sidebar-label">
                  Year:
                </label>
                <select name="year" id="year" className="sidebar-select">
                  <option value=""></option>
                  {years.length > 0
                    ? years.map((year, i) => {
                        return (
                          <option value={year} key={i}>
                            {year}
                          </option>
                        );
                      })
                    : null}
                </select>
              </li>
              <li className="sidebar-li tags-li">
                <label htmlFor="filterby-tags" className="sidebar-label">
                  Tags:
                </label>
                <div className="tagsinput-div">
                  <TagsInput
                    addTags={addTags}
                    removeTags={removeTags}
                    tags={tags}
                  />
                </div>
              </li>
            </ul>
            <div className="sidebar-button-flex">
              <input type="reset" value="Clear" className="sidebar-button" />
            </div>
          </form>
        </div>
      );
    default:
      return null;
  }
};

export default Sidebar;
