import React from "react";
import "./App.css";
import { LoginScreen } from "./components/login";
import { ProjectListPage } from "./components/project-list";
import { TsReactTest } from "./components/try-use-array";

function App() {
  return (
    <div className="App">
      {/* <ProjectListPage /> */}
      {/* <TsReactTest /> */}
      <LoginScreen />
    </div>
  );
}

export default App;
