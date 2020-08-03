import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <main>
      <h1>Welcome to iJournal!</h1>
      <Link>Log in</Link>
      <br />
      <Link>Sign Up</Link>
      <p>
        For static version, clicking either Log in or Sign up will take you into
        the app.
      </p>
    </main>
  );
};

export default Landing;
