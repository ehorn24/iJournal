import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <main className="landing-main">
      <h1 className="landing-header">Welcome to iJournal!</h1>
      <Link to="/home">Log in</Link>
      <br />
      <Link to="/home">Sign Up</Link>
      <p>
        For the static version, clicking either Log in or Sign up will take you
        into the app.
      </p>
    </main>
  );
};

export default Landing;
