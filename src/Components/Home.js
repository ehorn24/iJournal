import React from "react";
import { Link } from "react-router-dom";
import { MockData } from "../Mock Data/MockData";

const Home = () => {
  return (
    <>
      <header>
        <h1 className="home-header">iJournal</h1>
      </header>
      <main>
        <section className="sidebar">
          <h4>Sidebar Goes Here</h4>
        </section>
        <section className="my-journals">
          <h4>My Journals</h4>
          <div className="journals-flex">
            {MockData.map((j) => {
              return (
                <Link to={"/" + j.journal_title} className="journal">
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
