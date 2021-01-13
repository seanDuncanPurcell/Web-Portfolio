const bcrypt = require('bcrypt');
const express = require('express');
const db_url = 'mongodb://localhost:27017';
const mongoClient = require('mongodb').MongoClient;
const router = express.Router();

router.route('/')
.get((req, res) => {
  const projects = [
    {
      img: {}, 
      id: 'fgth', 
      name: 'Vestibulum Ante Ipsum', 
      description: 'Aliquam erat volutpat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc lacus dolor.'
    },
    {
      img: {src: '/img/pexels-vladislav-murashko-6017203_X500.jpg', alt: 'forest as background'}, 
      id: 'fgth', 
      name: 'Vestib Ante Ipsum Erat', 
      description: 'Aliquam erat volutpat. <b>Vestibulum</b> ante ipsum primis in faucibus <br/> orci luctus et ultrices posuere cubilia curae; Nunc lacus dolor.'
    }
  ]
  res.render('projects/project-overview', {projectBrief: projects});
});

router.route('/sampleone')
.get((req, res) => {
  res.render('project-template');
});

module.exports = router;