const bcrypt = require('bcrypt');
const express = require('express');
const db_url = 'mongodb://localhost:27017';
const mongoClient = require('mongodb').MongoClient;
const router = express.Router();

router.route('/')
.get((req, res) => {
  res.render('projects/project-overview', {loggedin: req.session.log, user: req.session.username});
});

router.route('/sampleone')
.get((req, res) => {
  res.render('project-template', {loggedin: req.session.log, user: req.session.username});
});

module.exports = router;