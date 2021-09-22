"use strict";
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
exports.__esModule = true;
exports.cleanObject = exports.isFalsy = void 0;
exports.isFalsy = function (value) {
  return value === 0 ? false : !value;
};
exports.cleanObject = function (object) {
  var _object = __assign({}, object);
  Object.keys(_object).forEach(function (key) {
    var value = _object[key];
    if (exports.isFalsy(value)) {
      delete _object[key];
    }
  });
  return _object;
};
