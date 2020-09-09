import React from "react";

const Landing = ({
  page,
  changeLogIn,
  handleFormChange,
  handleLogIn,
  handleSignUp,
  existingUsernames,
  username,
}) => {
  let existingUsers = existingUsernames.map((u) => u.username);

  //check if username is available
  let usernameAvailable = true;
  let renderMessage = false;
  if (username.length > 0 && existingUsers.indexOf(username) > -1) {
    usernameAvailable = false;
  }
  if (username.length > 0) {
    renderMessage = true;
  }
  let usernameMessage = "";
  if (renderMessage && usernameAvailable) {
    usernameMessage = <p>This username is available!</p>;
  } else if (renderMessage && !usernameAvailable) {
    usernameMessage = <p>This username is taken.</p>;
  }

  return (
    <main className="landing-main">
      <h1 className="landing-header">Welcome to iJournal!</h1>
      <div>
        {page === "login" ? (
          <div>
            <h3>Log in</h3>
            <form
              action=""
              onChange={handleFormChange}
              onSubmit={(e) => {
                e.preventDefault();
                handleLogIn();
              }}
            >
              <label htmlFor="username">Username:</label>
              <input type="text" name="username" id="username" />

              <label htmlFor="password">Password:</label>
              <input type="password" name="password" id="password" />

              <button type="submit">Log in</button>
            </form>
            <p>
              New to iJournal?
              <span onClick={changeLogIn}> Sign up here</span>
            </p>
          </div>
        ) : (
          <div>
            <h3>Create an account</h3>
            <form
              action=""
              onChange={handleFormChange}
              onSubmit={(e) => {
                e.preventDefault();
                handleSignUp();
              }}
            >
              <label htmlFor="username">Username:</label>
              <input type="text" name="username" id="username" />
              {usernameMessage}

              <label htmlFor="password">Password:</label>
              <input type="password" name="password" id="password" />

              <label htmlFor="firstname">First name:</label>
              <input type="text" name="firstname" id="firstname" />

              <label htmlFor="lastname">Last name:</label>
              <input type="text" name="lastname" id="lastname" />

              <button type="submit">Sign up</button>
            </form>
            <p>
              Already have an account?
              <span onClick={changeLogIn}> Log in here</span>
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Landing;
