const express = require('express');
const db_url = (process.env.db_url || 'mongodb://localhost:27017');
const mongoClient = require('mongodb').MongoClient;
const db = require('mongodb');
const router = express.Router();

router.route('/')
.get( async(req, res) => {
  const briefs = [];
  const client = await mongoClient.connect(db_url, {useUnifiedTopology: true});
  client.db('blogsystem').collection('articles').find({}).toArray(function(err, result) {
    if (err) throw err;
    result.forEach( (doc) => {
      const textBlock = doc.blocks[1].data.text;
      const element = {
        id: doc._id.toString(), 
        title: doc.blocks[0].data.text,
        summery: textBlock
      }
      briefs.push(element);
    });
    res.render('blog/blog', {articles: briefs});
    client.close();
  });
  
});

router.route('/article')
.get((req, res) => {
  res.render('blog/article-display', {articleID: undefined});
})
.post(async(req, res) => {
  const data = req.body;
  const client = await mongoClient.connect(db_url, {useUnifiedTopology: true});
  const articleStore = client.db('blogsystem').collection('articles');
  const newarticle = await articleStore.insertOne(data);
  const jData = JSON.stringify(newarticle.insertedId);
  res.send(jData);
});

router.route('/article/:id')
.get((req, res) => {
  res.render('blog/article-display', {articleID: req.params.id});
})
.post(async(req, res) => {
  const data = req.body;
  const client = await mongoClient.connect(db_url, {useUnifiedTopology: true});
  const articleStore = client.db('blogsystem').collection('articles');
  if(req.params.id) {
    const objectId = new db.ObjectId(req.params.id);
    try{
      const result = await articleStore.replaceOne({ _id: objectId}, data);
    }catch(err){
      console.log(err);
    }
  } else {
    console.log('id not found');
    const newarticle = await articleStore.insertOne(data);
    const jData = JSON.stringify(newarticle.insertedId);
    console.log('new id: ' + jData);
    res.send(jData);
  }
});

router.route('/articles_db/:id')
.get( async(req, res) => {  
  console.dir(req.params.id);
  const ObjectId = new db.ObjectId(req.params.id);
  const client = await mongoClient.connect(db_url, {useUnifiedTopology: true});
  const article = await client.db('blogsystem').collection('articles').findOne({ _id: ObjectId});
  const jsonArticle = JSON.stringify(article);
  res.send(jsonArticle);
});

module.exports = router;