import React from "react";

const Login = ({ match, logIn }) => {
  return (
    <main>
      {match.path === "/login" ? (
        <div>
          <h3>Log in!</h3>
          <form action="">
            <label htmlFor="username">Username:</label>
            <input type="text" name="username" id="username" />
            <label htmlFor="password">Password:</label>
            <input type="text" name="password" id="password" />
            <button onClick={logIn}>Log In</button>
          </form>
        </div>
      ) : (
        <div>
          <h3>Sign up!</h3>
          <form action="">
            <label htmlFor="username">Username:</label>
            <input type="text" name="username" id="username" />
            <label htmlFor="password">Password:</label>
            <input type="text" name="password" id="password" />
            <label htmlFor="firstname">First name:</label>
            <input type="text" name="firstname" id="firstname" />
            <label htmlFor="lastname">Last name:</label>
            <input type="text" name="lastname" id="lastname" />
            <button>Create account</button>
          </form>
        </div>
      )}
    </main>
  );
};

export default Login;
