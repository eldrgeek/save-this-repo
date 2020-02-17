import { CurrentModule, React, useApp } from "../util/CurrentModule";

import { logLoader } from "../util/logloader";
logLoader(module);

const Title = () => {
  const { state } = useApp();
  return (
    <React.Fragment>
      {state.title.split("\n").map((line, i) => (
        <h1 key={i}>{line}</h1>
      ))}
    </React.Fragment>
  );
};
export default Title;
CurrentModule(Title);
