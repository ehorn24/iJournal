import React from "react";
import { MockData } from "../Mock Data/MockData";
import { MockEntries } from "../Mock Data/MockEntries";
import TagsInput from "./TagsInput";

const Sidebar = ({ addTags, removeTags, tags, page }) => {
  let years = new Set();
  MockEntries.forEach((ent) => years.add(ent.entry_year));
  years = [...years];

  switch (page) {
    case "Home":
      return (
        <div className="sidebar">
          <h4 className="sidebar-header">Search for journal entries</h4>
          <form className="sidebar-form" onSubmit={(e) => e.preventDefault()}>
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
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
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
            <button className="sidebar-search">Search</button>
          </form>
        </div>
      );
    default:
      return page;
  }
};

export default Sidebar;
