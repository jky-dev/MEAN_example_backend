import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import Issue from './models/issue';

const app = express();

const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

mongoose.connect('mongodb+srv://meantute:meantute@hardstyledb-oyyj0.mongodb.net/issues?retryWrites=true&w=majority');

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB DB connection successfully established');
})

// get all issues from db
router.route('/issues').get((req, res) => {
    Issue.find((err, issues) => {
        if (err) {
            console.log(err);
        } else {
            // send back issues in json format
            res.json(issues);
        }
    });
});

// retrieve specific issue from database
router.route('/issues/:id').get((req, res) => {
    Issue.findById(req.params.id, (err, issue) => {
        if (err) {
            console.log(err);
        } else {
            res.json(issue);
        }
    });
});

// Add new post
router.route('/issues/add').post((req, res) => {
    let issue = new Issue(req.body);
    issue.save() // save to DB
        .then(issue => {
            res.status(200).json({'issue': 'Added successfully'})
        })
        .catch(err => {
            res.status(400).send('Failed to create a new record');
        });
});

// Update post by id
router.route('/issues/update/:id').post((req, res) => {
    Issue.findById(req.params.id, (err, issue) => {
        if (!issue) {
            return next(new Error('Could not load document'));
        } else {
            issue.title = req.body.title;
            issue.responsible = req.body.responsible;
            issue.description = req.body.description;
            issue.severity = req.body.severity;
            issue.status = req.body.status;

            issue.save().then(issue => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});

// delete issue based on id
router.route('/issues/delete/:id').get((req, res) => {
    Issue.findByIdAndRemove({_id: req.params.id}, (err, issue) => {
        if (err) {
            res.json(err);
        } else {
            res.json('Remove successfully');
        }
    });
});

app.use('/', router);

app.listen(port, () => console.log('Express running on port ' + port));