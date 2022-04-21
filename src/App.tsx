import React from "react";
import "./App.css";
import { AuthenticatedApp } from "./authenticated-app";
import { ErrorBoundary } from "./components/error-boundary";
import { FullPageErrorFallback } from "./components/lib";
import { useAuth } from "./context/auth-context";
import { UnauthenticatedApp } from "./unauthenticated-app";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      {/* <ProjectListPage /> */}
      {/* <TsReactTest /> */}
      <ErrorBoundary fallbackRender={FullPageErrorFallback}></ErrorBoundary>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;
