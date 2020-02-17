import { CurrentModule, React, useApp } from "./util/CurrentModule";

// import "./styles.css";
import Button from "../src/components/Button";
import Title from "../src/components/Title.jsx";
import { logLoader } from "./util/logloader";
logLoader(module);

function App() {
  const { state } = useApp();
  return (
    <div className="App">
      <Title />
      <Button type="decrease" />
      <Button type="increase" />
      <h2>{state.count}</h2>
    </div>
  );
}
CurrentModule(App);
