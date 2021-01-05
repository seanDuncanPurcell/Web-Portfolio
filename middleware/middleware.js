const db_url = (process.env.db_url || 'mongodb://localhost:27017');
const mongoClient = require('mongodb').MongoClient;
const db = require('mongodb');
const text = require('../useful-funcs/text-methods');

async function postBriefs(req, res, next) {
  const briefs = [];
  const client = await mongoClient.connect(db_url, {useUnifiedTopology: true});

  const result = await client.db('blogsystem').collection('articles').find({}).toArray();
  result.forEach( (doc) => {
    let artSumm = '';
    if(doc.blocks[1]){
      artSumm = text.htmlTrunk(doc.blocks[1].data.text);
    }
    const element = {
      id: doc._id.toString(), 
      title: doc.blocks[0].data.text,
      summery: (artSumm + '...')
    }
    briefs.push(element);
  });
  client.close();   
  res.locals.postBriefs = briefs;
  next();
}

function sessionTwoLocal(req, res, next) {//add session values to res.locals for view rendering
  console.log('sess2loc called');
  const {username, loggedin, admin} = req.session;
  res.locals.username = username;
  res.locals.loggedin = loggedin;
  res.locals.admin = admin;
  next();
}
module.exports.postBriefs = postBriefs;
module.exports.sessionTwoLocal = sessionTwoLocal;