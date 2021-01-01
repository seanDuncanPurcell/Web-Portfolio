/*
TODO
1) Sanitize incoming blog ariticals.
2) DONE>> Use quary params in artical-get reqs to return exsisting artical. 
*/

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
    res.render('blog/blog', {articles: briefs, loggedin: req.session.log, user: req.session.username});
    client.close();
  });
  
});

router.route('/article')
.get((req, res) => {
  res.render('blog/article-display', {articleID: req.query.id, loggedin: req.session.log, user: req.session.username});
})
.post(async(req, res) => {
  const data = req.body;
  const artId =req.query.id;
  const client = await mongoClient.connect(db_url, {useUnifiedTopology: true});
  const articleStore = client.db('blogsystem').collection('articles');
  if(!artId){
    const newarticle = await articleStore.insertOne(data);
    const jData = JSON.stringify(newarticle.insertedId);
    res.send(jData);
  }else{
    const objectId = new db.ObjectId(artId);
    try{
      const cmdRes = await articleStore.replaceOne({ _id: objectId}, data);
      if(cmdRes.modifiedCount > 1) throw new Error('Database was not able to modify any documents.');
    }catch(err){
      console.log(err);
    }
  }

});

router.route('/articles_db/:id')
.get( async(req, res) => {
  const ObjectId = new db.ObjectId(req.params.id);
  const client = await mongoClient.connect(db_url, {useUnifiedTopology: true});
  const article = await client.db('blogsystem').collection('articles').findOne({ _id: ObjectId});
  const jsonArticle = JSON.stringify(article);
  res.send(jsonArticle);
});

module.exports = router;