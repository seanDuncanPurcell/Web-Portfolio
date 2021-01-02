/*
TODO
1) Sanitize incoming blog ariticals.
2) DONE>> Use quary params in artical-get reqs to return exsisting artical.
3) Abstract htmlCleaner & textlimmiter to text processing modula.
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

  const result = await client.db('blogsystem').collection('articles').find({}).toArray();
  result.forEach( (doc) => {
    let artSumm = '';
    if(doc.blocks[1]){

      const clnTxt = (htmlCleaner = (text) => {
        if(typeof text === 'object') text = text.toString();
        let arrText = text.split('');        
        let firstIndex = arrText.indexOf('<');

        while(firstIndex !== -1){
          const secondIndex = arrText.indexOf('>');
          const charRemove = secondIndex - firstIndex + 1;
          let holder = arrText.splice(firstIndex, charRemove);
          
          firstIndex = arrText.indexOf('<');
        }

        return arrText.join('');
      })(doc.blocks[1].data.text);

      artSumm = (textLimiter = (text, limit) => {
          const textArr = text.split(' ');
          textArr.splice(limit);
          return textArr.join(' ');
      })(clnTxt, 20);

    }
    const element = {
      id: doc._id.toString(), 
      title: doc.blocks[0].data.text,
      summery: (artSumm + '...')
    }
    briefs.push(element);
  });

  res.render('blog/blog', {articles: briefs});

  client.close(); 
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