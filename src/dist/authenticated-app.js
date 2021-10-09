"use strict";
exports.__esModule = true;
exports.AuthenticateApp = void 0;
var react_1 = require("react");
var project_list_1 = require("screens/project-list");
var auth_context_1 = require("context/auth-context");
exports.AuthenticateApp = function () {
  var logout = auth_context_1.useAuth().logout;
  return react_1["default"].createElement(
    "div",
    null,
    react_1["default"].createElement(
      "button",
      { onClick: logout },
      "\u767B\u51FA"
    ),
    react_1["default"].createElement(project_list_1.ProjectListScreen, null)
  );
};
