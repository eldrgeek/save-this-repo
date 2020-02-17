import React from "react";
import { render } from "react-dom";
import { Provider } from "overmind-react";
import { app } from "../app";
import { useApp } from "../app";
import "../styles.css";
import { logLoader } from "../util/logloader";
logLoader(module);

const Nothing = () => {
  return "The currrent module is nothing";
};

const CurrentModule = Element => {
  const rootElement = document.getElementById("root");
  render(
    <Provider value={app}>
      <Element />
    </Provider>,
    rootElement
  );
};
export { CurrentModule, React, useApp };
export default CurrentModule;
CurrentModule(Nothing);
