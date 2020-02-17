import { createOvermind as originalOvermind } from "overmind";
import { logLoader } from "./logloader";
logLoader(module);

class StateManager {
  constructor({ state, actions, effects }) {
    this.state = state;
    this.actions = actions;
    this.effects = effects;
    // this.state.devState = StateManager.devState;
  }
  computeScalarStates() {
    const state = this.state;
    if (this.state.devState.stateAttributes !== null) {
      this.scalarStates = this.state.devState.stateAttributes.split(",");
    } else {
      //automatically create the list to save
      this.scalarStates = Object.keys(state).filter(
        e => typeof state[e] !== "function" && e !== "devState"
      );
      // console.log(scalarStates);
    }
    this.state.devState.stateAttributes = this.scalarStates.join(",");
  }

  /*Get the names of the state variables that are not functions
    Must be called with state before createOvermind
    Sets stateAttributes to this list if it is null */

  async saveLocalAttribute(attr, value) {
    if (this.state.devState.logSave) console.log("saving ", attr, value);
    localStorage.setItem(attr, JSON.stringify(value));
  }

  getLocalAttribute(attr, value) {
    let saved = localStorage.getItem(attr);
    if (this.state.devState.logRestore)
      console.log("recovered", attr, saved, JSON.parse(saved));
    try {
      return JSON.parse(saved);
    } catch (e) {
      return value;
    }
  }

  /* save the state and effects for use within this module
    Restore all the attributes that have been saved, and 
     */
  process() {
    //stateAttributes must have been set by call to computeScalarStates
    // console.log("process");
    this.attributes = this.state.devState.stateAttributes.split(",");
    this.savedAttributes = this.getLocalAttribute("savedAttributes");
    if (!this.savedAttributes) this.savedAttributes = [];
    if (!this.state.devState.restoreState) return;
    if (!this.state.reloadLocal) return;
    this.savedAttributes.forEach(attr => {
      let value = (this.state[attr] = this.getLocalAttribute(attr));

      if (this.state.devState.logDiags.restore)
        console.log("Restoring ", attr, value);
    }); // await actions.restoreSavedAttrs();
    // this.restoreSavedAttrs();
  }

  saveAttr(attr, value) {}

  async saveAttrs() {
    if (this.state.devState.saveState) {
      this.attributes.forEach(attr =>
        this.saveLocalAttribute(attr, this.state[attr])
      );
      this.savedAttributes = this.attributes;
    } else {
      this.savedAttributes = [];
    }
    this.saveLocalAttribute("savedAttributes", this.savedAttributes);
  }

  makeReactions(app) {
    if (this.attributes)
      this.attributes.forEach(attr => this.makeReaction(app, attr));
  }
  makeReaction(app, attr) {
    // console.log("make reaction for", attr);
    const state = this.state;
    app.reaction(
      // this.state => this.state[attr],

      state => state[attr],
      //Fix bug passing fragments
      value => {
        if (state.devState.save) console.log("saved " + attr, value);
        this.saveLocalAttribute(attr, value);
      }
    );
  }
  initProxy = ({ state, actions, effects }, instance) => {
    // debugger
    // console.log("proxy", state);
    // statemanager.restoreSavedAttrs(state)
    this.initRoutine({ state, actions, effects }, instance);
    // console.log("init complete")
  };
  setInit(initRoutine) {
    this.initRoutine = initRoutine;
  }
}

export const createOvermind = (config, options) => {
  // debugger
  let statemanager = new StateManager(config);
  //Caution: when hot reloading this will not
  //change anything
  if (!config.state.devState || config.state.devState.source === module.id)
    config.state.devState = {
      source: module.id, //this can be removed if in state
      stateAttributes: null,
      restoreState: true,
      saveState: true,
      logDiags: {
        save: true,
        restore: true
      }
    };

  statemanager.computeScalarStates(config.state);
  statemanager.setInit(config.onInitialize);
  config.onInitialize = statemanager.initProxy.bind(statemanager);
  statemanager.process();
  // console.log(config.state);
  let app = originalOvermind(config, options);
  // statemanager.saveAttrs(config);
  statemanager.makeReactions(app);
  statemanager.saveAttrs();
  return app;
};
