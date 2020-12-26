const bcrypt = require('bcrypt');
const express = require('express');
const db_url = 'mongodb://localhost:27017';
const mongoClient = require('mongodb').MongoClient;
const router = express.Router();

function hello () {console.log('hello!')};

router.route('/overview')
.get((req, res) => {
  res.render('blog/blog');
});

router.route('/artical')
.get((req, res) => {
  res.render('blog/artical-template');
});
router.route('/new_artical')
.get((req, res) => {
  res.render('blog/new-artical');
});

module.exports = router;