import React from "react";
import { Link } from "react-router-dom";

const Header = ({ user }) => {
  return (
    <header className="ijournal-header">
      <Link to="/">{user}'s iJournal</Link>
    </header>
  );
};

export default Header;
