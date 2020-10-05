import React from "react";
import { Link } from "react-router-dom";

const Header = ({ user, handleLogOut }) => {
  return (
    <div>
      <label className="logout-dropdown-container">
        <input type="checkbox" />
        <img
          className="logout-icon"
          src="https://peopleshub.org/wp-content/uploads/2018/04/person-icon-white.png"
          alt=""
        />
        <span className="logout-menu">
          <Link to="/">Home</Link>
          <span className="logout-button" onClick={handleLogOut}>
            Log Out
          </span>
        </span>
      </label>

      <header className="ijournal-header">
        <Link to="/">{user}'s iJournal</Link>
      </header>
    </div>
  );
};

export default Header;
