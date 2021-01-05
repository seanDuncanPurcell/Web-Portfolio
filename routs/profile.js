const express = require('express');
const router = express.Router();
const pfData = require('../temp-db/profile-data.json');

router.route('/')
.get((req, res)=>{
  res.render('profile/one-pg-profile', pfData);
});

module.exports = router;