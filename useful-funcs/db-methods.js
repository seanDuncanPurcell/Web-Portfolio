const db_url = (process.env.db_url || 'mongodb://localhost:27017');
const mongoClient = require('mongodb').MongoClient;
const text = require('../useful-funcs/text-methods');


//postBrieft needs to be removed from middle wear as it is no long used that way.
async function postBriefs(num) {
  const briefs = [];
  const client = await mongoClient.connect(db_url, {useUnifiedTopology: true});

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
    const projects = [
        {
            img: {}, 
            id: 'fgth', 
            name: 'Vestibulum Ante Ipsum', 
            description: 'Aliquam erat volutpat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc lacus dolor.'
        },
        {
            img: {src: '/img/pexels-vladislav-murashko-6017203_X500.jpg', alt: 'forest as background'}, 
            id: 'fgth', 
            name: 'Vestib Ante Ipsum Erat', 
            description: 'Aliquam erat volutpat. <b>Vestibulum</b> ante ipsum primis in faucibus <br/> orci luctus et ultrices posuere cubilia curae; Nunc lacus dolor.'
        },
        {
            img: {src: '/img/pexels-vladislav-murashko-6017203_X500.jpg', alt: 'forest as background'}, 
            id: 'fgth', 
            name: 'Vestib Ante Ipsum Erat', 
            description: 'Aliquam erat volutpat. <b>Vestibulum</b> ante ipsum primis in faucibus <br/> orci luctus et ultrices posuere cubilia curae; Nunc lacus dolor.'
        },
        {
            img: {src: '/img/pexels-vladislav-murashko-6017203_X500.jpg', alt: 'forest as background'}, 
            id: 'fgth', 
            name: 'Vestib Ante Ipsum Erat', 
            description: 'Aliquam erat volutpat. <b>Vestibulum</b> ante ipsum primis in faucibus <br/> orci luctus et ultrices posuere cubilia curae; Nunc lacus dolor.'
        }
    ]

    return projects;
}

module.exports.postBriefs = postBriefs;
module.exports.projectCards = projectCards;