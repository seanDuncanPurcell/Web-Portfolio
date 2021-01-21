const express = require('express');
const router = express.Router();
const {projectCards} = require('../useful-funcs/db-methods.js') 

router.route('/')
.get( async(req, res) => {  
  res.locals.projectCards = await projectCards();
  res.render('projects/project-overview');
});

router.route('/sampleone')
.get((req, res) => {
  res.render('projects/project-template');
});

module.exports = router;