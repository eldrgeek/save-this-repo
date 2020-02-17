import { logLoader } from "../util/logloader";
logLoader(module);
export const onInitialize = async ({ state, actions, effects }, instance) => {
  logLoader("initialize");
  // console.log('on initialize', state, actions, effects);
};
