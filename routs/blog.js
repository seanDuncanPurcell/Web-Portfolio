const express = require('express');
const db_url = 'mongodb://localhost:27017';
const mongoClient = require('mongodb').MongoClient;
const router = express.Router();

router.route('/')
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
})
.post(async(req, res) => {
  const data = req.body;
  console.log('Here is your data: ');
  console.log(data);

  const client = await mongoClient.connect(db_url, {useUnifiedTopology: true});
  const articalStore = client.db('blogsystem').collection('articals');
  articalStore.insertOne(data);
});

module.exports = router;