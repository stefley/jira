import React from "react";
import { UnauthenticatedApp } from "unauthenticated-app";
import { AuthenticateApp } from "./authenticated-app";
import { useAuth } from "./context/auth-context";
import "./App.css";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      {user ? <AuthenticateApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;
