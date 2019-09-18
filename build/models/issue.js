"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Issue = new Schema({
  title: {
    type: String
  },
  responsible: {
    type: String
  },
  description: {
    type: String
  },
  severity: {
    type: String
  },
  status: {
    type: String,
    "default": 'Open'
  }
});

var _default = mongoose.model('Issue', Issue); // exports schema defined above as an "Issue"


exports["default"] = _default;
//# sourceMappingURL=issue.js.map