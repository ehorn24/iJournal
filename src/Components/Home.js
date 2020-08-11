import React from "react";
import { Link } from "react-router-dom";
import { MockData } from "../Mock Data/MockData";
import { MockEntries } from "../Mock Data/MockEntries";
import TagsInput from "./TagsInput";

const Home = ({ addTags, removeTags, tags }) => {
  let years = new Set();
  MockEntries.forEach((ent) => years.add(ent.entry_year));
  years = [...years];
  return (
    <>
      <header>
        <h1 className="home-header">iJournal</h1>
      </header>
      <main className="home-main">
        <section className="sidebar">
          <h4>Search for entries</h4>
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
          <label htmlFor="filterby-month">Month</label>
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
          <label htmlFor="filterby-tags">Tags:</label>
          <TagsInput addTags={addTags} removeTags={removeTags} tags={tags} />
          <button className="submit">Search</button>
        </section>
        <section className="my-journals">
          <h4>My Journals</h4>
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
      </main>
    </>
  );
};

export default Home;
