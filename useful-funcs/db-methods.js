const db_url = `mongodb+srv://${process.env.DB_LOGIN}@cluster0.c3kth.mongodb.net/admin?retryWrites=true&w=majority`;
  const mongoOps = { useNewUrlParser: true, useUnifiedTopology: true };
const {MongoClient} = require('mongodb');
const text = require('../useful-funcs/text-methods');
const projects = require('../temp-db/projects.json');


//postBrieft needs to be removed from middle wear as it is no long used that way.
async function postBriefs(num) {
  const briefs = [];
  const client = await MongoClient.connect(db_url, mongoOps);

  const result = await client.db('blogsystem').collection('articles').find({}).toArray();
  result.forEach( (doc) => {
    let artSumm = '';
    if(doc.blocks[1]){
      artSumm = text.htmlTrunk(doc.blocks[1].data.text, num);
    }
    const element = {
      id: doc._id.toString(), 
      title: doc.blocks[0].data.text,
      summery: (artSumm + '...')
    }
    briefs.push(element);
  });
  client.close();   
  return briefs;
}

async function projectCards() {
  return projects;
}

module.exports.postBriefs = postBriefs;
module.exports.projectCards = projectCards;