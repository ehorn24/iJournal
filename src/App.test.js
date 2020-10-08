import React from "react";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import App from "./App";
import userServices from "./Services/userServices";

describe("App", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
