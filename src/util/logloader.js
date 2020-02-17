const doLog = true;
export const logLoader = module => {
  if (doLog) {
    if (module.id) console.log("loaded", module.id);
  } else {
    console.log("executed", module);
  }
};
