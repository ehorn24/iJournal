import React from "react";
import { MockData } from "../Mock Data/MockData";
import { MockEntries } from "../Mock Data/MockEntries";
import TagsInput from "./TagsInput";

const Sidebar = ({
  addTags,
  removeTags,
  tags,
  page,
  handleFormChange,
  clearFilters,
}) => {
  let years = new Set();
  MockEntries.forEach((ent) => years.add(ent.year));
  years = [...years];

  switch (page) {
    case "Home":
      return (
        <div className="sidebar">
          <h4 className="sidebar-header">Search for journal entries</h4>
          <form
            className="sidebar-form"
            onChange={handleFormChange}
            onSubmit={(e) => e.preventDefault()}
            onReset={clearFilters}
          >
            <ul>
              <li>
                <label htmlFor="filterby-journal">Journal:</label>
                <select name="journal" id="journal">
                  <option value=""></option>
                  {MockData.map((j, i) => {
                    return (
                      <option value={j.journal_title} key={i}>
                        {j.journal_title}
                      </option>
                    );
                  })}
                </select>
              </li>
              <li>
                <label htmlFor="filterby-month">Month:</label>
                <select name="month" id="month">
                  <option value=""></option>
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </select>
              </li>
              <li>
                <label htmlFor="">Year:</label>
                <select name="year" id="year">
                  <option value=""></option>
                  {years.map((y, i) => {
                    return (
                      <option key={i} value={y}>
                        {y}
                      </option>
                    );
                  })}
                </select>
              </li>
              <li>
                <label htmlFor="filterby-tags">Tags:</label>
                <TagsInput
                  addTags={addTags}
                  removeTags={removeTags}
                  tags={tags}
                />
              </li>
            </ul>
            <div className="sidebar-button-flex">
              <input
                type="reset"
                className="sidebar-button"
                value="Clear All Filters"
              />
            </div>
          </form>
        </div>
      );
    case "Journal":
      return (
        <div className="sidebar">
          <h4 className="sidebar-header">Search for journal entries</h4>
          <form
            className="sidebar-form"
            onChange={handleFormChange}
            onSubmit={(e) => e.preventDefault()}
            onReset={clearFilters}
          >
            <ul>
              <li>
                <label htmlFor="filterby-month">Month:</label>
                <select name="month" id="month">
                  <option value=""></option>
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </select>
              </li>
              <li>
                <label htmlFor="">Year:</label>
                <select name="year" id="year">
                  <option value=""></option>
                  {years.map((y, i) => {
                    return (
                      <option key={i} value={y}>
                        {y}
                      </option>
                    );
                  })}
                </select>
              </li>
              <li>
                <label htmlFor="filterby-tags">Tags:</label>
                <TagsInput
                  addTags={addTags}
                  removeTags={removeTags}
                  tags={tags}
                />
              </li>
            </ul>
            <div className="sidebar-button-flex">
              <input
                type="reset"
                className="sidebar-button"
                value="Clear All Filters"
              />
            </div>
          </form>
        </div>
      );
    default:
      return null;
  }
};

export default Sidebar;
