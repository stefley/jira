"use strict";
exports.__esModule = true;
var react_1 = require("react");
var login_1 = require("screens/login");
require("./App.css");
function App() {
  return react_1["default"].createElement(
    "div",
    { className: "App" },
    react_1["default"].createElement(login_1.LoginScreen, null)
  );
}
exports["default"] = App;
