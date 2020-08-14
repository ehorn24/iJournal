import React from "react";
import { Link } from "react-router-dom";
import { MockData } from "../Mock Data/MockData";

const Home = () => {
  return (
    <>
      <main className="home-main">
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
