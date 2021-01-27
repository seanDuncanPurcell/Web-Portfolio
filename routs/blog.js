/*
TODO
1) Sanitize incoming blog ariticals.
2) DONE>> Use quary params in artical-get reqs to return exsisting artical.
3) DONE>> Abstract htmlCleaner & textlimmiter to text processing modula.
*/

const express = require('express');
const db_url = `mongodb+srv://${process.env.DB_LOGIN}@cluster0.c3kth.mongodb.net/admin?retryWrites=true&w=majority`;
  const mongoOps = { useNewUrlParser: true, useUnifiedTopology: true };
const {MongoClient} = require('mongodb');
const db = require('mongodb');
const router = express.Router();
const {postBriefs} = require('../useful-funcs/db-methods.js');

router.route('/')
.get( async(req, res) => {
  res.locals.postBriefs = await postBriefs(50);
  res.render('blog/blog');
});

router.route('/article')
.get((req, res) => {
  res.render('blog/article-display', {articleID: req.query.id});
})
.post(async(req, res) => {
  if(!req.session.admin){
    return res.status(401).send('Missing authorisation to post articals');
  }
  const data = req.body;
  const artId = req.query.id;
  const client = await MongoClient.connect(db_url, mongoOps);
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
  const client = await MongoClient.connect(db_url, mongoOps);
  const article = await client.db('blogsystem').collection('articles').findOne({ _id: ObjectId});
  const jsonArticle = JSON.stringify(article);
  res.send(jsonArticle);
});

module.exports = router;