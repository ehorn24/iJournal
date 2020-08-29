import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="ijournal-header">
      <Link to="/home">iJournal</Link>
    </header>
  );
};

export default Header;
