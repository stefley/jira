"use strict";
exports.__esModule = true;
var react_1 = require("react");
var unauthenticated_app_1 = require("unauthenticated-app");
var authenticated_app_1 = require("./authenticated-app");
var auth_context_1 = require("./context/auth-context");
require("./App.css");
function App() {
  var user = auth_context_1.useAuth().user;
  return react_1["default"].createElement(
    "div",
    { className: "App" },
    user
      ? react_1["default"].createElement(
          authenticated_app_1.AuthenticateApp,
          null
        )
      : react_1["default"].createElement(
          unauthenticated_app_1.UnauthenticatedApp,
          null
        )
  );
}
exports["default"] = App;
