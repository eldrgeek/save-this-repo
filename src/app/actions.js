import { logLoader } from "../util/logloader";
logLoader(module);
export const actions = {
  increaseCount({ state }) {
    state.count++;
  },
  decreaseCount({ state }) {
    state.count--;
  }
};
