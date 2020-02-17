import { createHook } from "overmind-react";
import state from "./state";
import { onInitialize } from "./onInitialize";
import { actions } from "./actions";
import * as effects from "./effects";

import { createOvermind } from "overmind";
// import { createOvermind } from "../util/statemanager";
import { logLoader } from "../util/logloader";
logLoader(module);

const config = {
  onInitialize,
  state,
  actions,
  effects
};
// console.log("state", state);
export const app = createOvermind(config, {
  // devtools: 'penguin.linux.test:8080', //
  devtools: "localhost:3031"
});

export const useApp = createHook();
