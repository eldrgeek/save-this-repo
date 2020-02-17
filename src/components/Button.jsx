import { CurrentModule, React, useApp } from "../util/CurrentModule";

import { logLoader } from "../util/logloader";
logLoader(module);
const Button = props => {
  const { actions } = useApp();
  if (props.type === "decrease")
    return <button onClick={() => actions.decreaseCount()}>decrease</button>;
  return <button onClick={() => actions.increaseCount()}>increase</button>;
};

export default Button;
CurrentModule(Button);
