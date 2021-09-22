"use strict";
exports.__esModule = true;
exports.useDebounce = exports.useMount = void 0;
var react_1 = require("react");
exports.useMount = function (cb) {
  react_1.useEffect(function () {
    cb();
  }, []);
};
exports.useDebounce = function (value, delay) {
  if (delay === void 0) {
    delay = 60;
  }
  var _a = react_1.useState(value),
    val = _a[0],
    setVal = _a[1];
  react_1.useEffect(
    function () {
      var timer = setTimeout(function () {
        setVal(value);
      }, delay);
      return function () {
        clearTimeout(timer);
      };
    },
    [value, delay]
  );
  return val;
};
