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
      <h1 className="landing-header">Welcome to</h1>{" "}
      <h1 className="title-span"> iJournal</h1>
      <div className="book">
        <span className="page turn"></span>
        <span className="page turn"></span>
        <span className="page turn"></span>
        <span className="page turn"></span>
        <span className="page turn"></span>
        <span className="page turn"></span>
        <span className="cover"></span>
        <span className="page"></span>
        <span className="cover turn"></span>
      </div>
      <div>
        {page === "login" ? (
          <div className="login-form-div">
            <form
              className="login-form"
              onChange={handleFormChange}
              onSubmit={(e) => {
                e.preventDefault();
                handleLogIn();
              }}
            >
              <label htmlFor="username"></label>
              <input
                type="text"
                name="username"
                id="username"
                className="login-input"
                placeholder="Username"
              />

              <label htmlFor="password"></label>
              <input
                type="password"
                name="password"
                id="password"
                className="login-input"
                placeholder="Password"
              />

              <button type="submit" className="login-submit-button">
                Log In
              </button>
            </form>
            <p className="login-p">
              New to iJournal?
              <span onClick={changeLogIn} className="login-switch">
                {" "}
                Sign up here
              </span>
            </p>
          </div>
        ) : (
          <div className="signup-form-div">
            <form
              action=""
              onChange={handleFormChange}
              onSubmit={(e) => {
                e.preventDefault();
                handleSignUp();
              }}
              className="signup-form"
            >
              <label htmlFor="username"></label>
              <input
                type="text"
                name="username"
                id="username"
                className="signup-input"
                placeholder="Username"
              />
              {usernameMessage}
              <label htmlFor="password"></label>
              <input
                type="password"
                name="password"
                id="password"
                className="signup-input"
                placeholder="Password"
              />
              <label htmlFor="firstname"></label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                className="signup-input"
                placeholder="First Name"
              />
              <label htmlFor="lastname"></label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                className="signup-input"
                placeholder="Last Name"
              />
              <button type="submit" className="signup-submit-button">
                Sign up
              </button>
            </form>
            <p className="signup-p">
              Already have an account?
              <span onClick={changeLogIn} className="signup-switch">
                {" "}
                Log in here
              </span>
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Landing;
