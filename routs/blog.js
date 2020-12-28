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

  const client = await mongoClient.connect(db_url, {useUnifiedTopology: true});
  const articalStore = client.db('blogsystem').collection('articals');
  if(data.id) {
    console.log('id found');
    const objectId = new db.ObjectId(data.id);
    try{
      const result = await articalStore.replaceOne({ _id: objectId}, data);
    }catch(err){
      console.log(err);
    }

  } else {
    console.log('id not found');
    const newArtical = await articalStore.insertOne(data);
    const jData = JSON.stringify(newArtical.insertedId);
    console.log('new id: ' + jData);
    res.send(jData);
  }
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