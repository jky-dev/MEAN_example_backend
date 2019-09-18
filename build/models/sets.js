"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var set = new Schema({
  festival: {
    type: String
  },
  year: {
    type: String
  },
  title: {
    type: String
  },
  url: {
    type: String
  },
  time: {
    type: String
  },
  setname: {
    type: String
  }
});

var _default = _mongoose["default"].model('Set', set); // exports schema defined above as an "Set"


exports["default"] = _default;
//# sourceMappingURL=sets.js.map