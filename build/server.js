"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _issue = _interopRequireDefault(require("./models/issue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();

var router = _express["default"].Router();

app.use((0, _cors["default"])());
app.use(_bodyParser["default"].json());
var port = process.env.PORT || 8080;

_mongoose["default"].connect('mongodb+srv://meantute:meantute@hardstyledb-oyyj0.mongodb.net/issues?retryWrites=true&w=majority');

var connection = _mongoose["default"].connection;
connection.once('open', function () {
  console.log('MongoDB DB connection successfully established');
}); // get all issues from db

router.route('/issues').get(function (req, res) {
  _issue["default"].find(function (err, issues) {
    if (err) {
      console.log(err);
    } else {
      // send back issues in json format
      res.json(issues);
    }
  });
}); // retrieve specific issue from database

router.route('/issues/:id').get(function (req, res) {
  _issue["default"].findById(req.params.id, function (err, issue) {
    if (err) {
      console.log(err);
    } else {
      res.json(issue);
    }
  });
}); // Add new post

router.route('/issues/add').post(function (req, res) {
  var issue = new _issue["default"](req.body);
  issue.save() // save to DB
  .then(function (issue) {
    res.status(200).json({
      'issue': 'Added successfully'
    });
  })["catch"](function (err) {
    res.status(400).send('Failed to create a new record');
  });
}); // Update post by id

router.route('/issues/update/:id').post(function (req, res) {
  _issue["default"].findById(req.params.id, function (err, issue) {
    if (!issue) {
      return next(new Error('Could not load document'));
    } else {
      issue.title = req.body.title;
      issue.responsible = req.body.responsible;
      issue.description = req.body.description;
      issue.severity = req.body.severity;
      issue.status = req.body.status;
      issue.save().then(function (issue) {
        res.json('Update done');
      })["catch"](function (err) {
        res.status(400).send('Update failed');
      });
    }
  });
}); // delete issue based on id

router.route('/issues/delete/:id').get(function (req, res) {
  _issue["default"].findByIdAndRemove({
    _id: req.params.id
  }, function (err, issue) {
    if (err) {
      res.json(err);
    } else {
      res.json('Remove successfully');
    }
  });
});
app.use('/', router);
app.listen(port, function () {
  return console.log('Express running on port ' + port);
});
//# sourceMappingURL=server.js.map