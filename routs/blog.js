const express = require('express');
const db_url = 'mongodb://localhost:27017';
const mongoClient = require('mongodb').MongoClient;
const db = require('mongodb');
const router = express.Router();

router.route('/')
.get((req, res) => {
  res.render('blog/blog');
});

router.route('/artical')
.get((req, res) => {
  res.render('blog/artical-display', {articalID: undefined});
})
.post(async(req, res) => {
  const data = req.body;
  console.log('Here is your data: ');
  console.log(data);

  const client = await mongoClient.connect(db_url, {useUnifiedTopology: true});
  const articalStore = client.db('blogsystem').collection('articals');

  // articalStore.insertOne(data);
});

router.route('/artical/:id')
.get((req, res) => {
  res.render('blog/artical-display', {articalID: req.params.id});
})

router.route('/articals_db/:id')
.get( async(req, res) => {  
  console.dir(req.params.id);
  const ObjectId = new db.ObjectId(req.params.id);
  const client = await mongoClient.connect(db_url, {useUnifiedTopology: true});
  const artical = await client.db('blogsystem').collection('articals').findOne({ _id: ObjectId});
  console.log(artical);
  const jsonArtical = JSON.stringify(artical);
  res.send(jsonArtical);
});

module.exports = router;