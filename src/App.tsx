import React from "react";
import { UnauthenticatedApp } from "unauthenticated-app";
import { AuthenticateApp } from "./authenticated-app";
import { useAuth } from "./context/auth-context";
import { ErrorBoundary } from "components/error-boundary";
import "./App.css";
import { FullPageErrorFallback } from "components/lib";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AuthenticateApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
