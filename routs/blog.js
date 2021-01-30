const express = require('express');
const db_url = `mongodb+srv://${process.env.DB_LOGIN}@cluster0.c3kth.mongodb.net/admin?retryWrites=true&w=majority`;
  const mongoOps = { useNewUrlParser: true, useUnifiedTopology: true };
const {MongoClient} = require('mongodb');
const db = require('mongodb');
const helmet = require('helmet');
const router = express.Router();
const {postBriefs} = require('../useful-funcs/db-methods.js');

//Special CSP Dec
const blogCsp = {
  directives: {
    ...helmet.contentSecurityPolicy.getDefaultDirectives(),
    'base-uri': ["'self'"],
    'block-all-mixed-content': [],
    'default-src': ["'self'"],
    'object-src': ["'none'"],
    'script-src': ["'self'"],
    'script-src-elem': ["'self'", "unpkg.com", "cdn.quilljs.com"],
    'script-src-attr': ["'self'"],
    'style-src': ["'self'", "'unsafe-inline'"],
    'style-src-elem': ["'self'", "cdn.quilljs.com"],
    'upgrade-insecure-requests': [],
  }
}

router.route('/')
.get( async(req, res) => {
  res.locals.postBriefs = await postBriefs(50);
  res.render('blog/blog');
});

router.route('/article')
.get( helmet.contentSecurityPolicy(blogCsp), (req, res) => {
  res.render('blog/article-view');
})

router.route('/article/editor')
.get( helmet.contentSecurityPolicy(blogCsp), (req, res) => {
  if(!req.session.admin){
    res.status(401).send('Missing authorisation to edit articals.');
  }else{
    res.render('blog/article-editor', {articleID: req.query.id});
  }
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

module.exports = router;