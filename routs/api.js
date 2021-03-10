const bcrypt = require('bcrypt');
const db_url = `mongodb+srv://${process.env.DB_LOGIN}@cluster0.c3kth.mongodb.net/admin?retryWrites=true&w=majority`;
  const mongoOps = { useNewUrlParser: true, useUnifiedTopology: true };
const express = require('express');
const Joi = require('joi');
const salt = parseInt(process.env.SALT_ONE);
const {MongoClient} = require('mongodb');
  const db = require('mongodb');
const router = express.Router();
const { RateLimiterMongo } = require('rate-limiter-flexible');

//set limits for new user accounts
const mongoConn = MongoClient.connect(db_url, mongoOps);
const maxAcctsByIP = 4;
const limiterNewAcctFromIPperDay = new RateLimiterMongo({
  storeClient: mongoConn,
  keyPrefix: 'max_client_accounts_by_IP',
  points: maxAcctsByIP,
  duration: 60 * 60 * 24, // Store number for 24 hours
});

//checks if a username is currently in the db
router.route('/is-user')
.get( async (req, res) => {
    const name = req.query.username;
    if(name){
      client = await MongoClient.connect(db_url, mongoOps);
      const collection = client.db('blogsystem').collection('users');
      const foundUser = await collection.findOne({username: name});
      if(foundUser){
        res.send(true);
      }
    }
});

//user to generate a new user into  db
router.route('/new-user')
.post( async (req, res) => {

  //1) Make declarations
  const data = req.body;
  const schema = Joi.object({
      username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .allow(''),
      password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{4,30}$'))
        .required(),
      repeat_password: Joi.ref('password'),
  });
  const rlResIp = await limiterNewAcctFromIPperDay.get(req.ip);

  //2) Connect to DB
  const client = await MongoClient.connect(db_url, mongoOps);
  const collection = client.db('blogsystem').collection('users');

  try{
    //3) confirm user has remaining point for new account
    if (rlResIp !== null && rlResIp.consumedPoints > maxAcctsByIP) {
      res.status(429).send(JSON.stringify({'error': 'You have created too many accounts in too short a time period.'}));
    } else {
      //3) Validate Inputs
      const foundName = await collection.findOne({username: data.username});
      let foundemail;
      if(data.email)foundemail = await collection.findOne({username: data.email});
      const joiResponce = schema.validate(data);
  
      //4) handle failed validaition
      if (foundName) throw new Error('That username is already in use.');
      else if (foundemail) throw new Error('That email is already in use.');
      else if (joiResponce.error) throw new Error(joiResponce.error.details[0].message);
  
      //5) consume on of the current IP's accounts for given period
      await limiterNewAcctFromIPperDay.consume(req.ip, 1);

      //6) encrypt pass word and insert user into db
      const encrypt = await bcrypt.hash(req.body.password, salt);
      const newUser = await collection.insertOne({
        username: req.body.username,
        email: req.body.email,
        password: encrypt,
        admin: false
      });
      
      //7) add new user into session
      req.session.username = newUser.ops[0].username;
      req.session.loggedin = true;
      req.session.admin = false;      
      res.status('200').send(JSON.stringify({message: 'You have been logged in!'}));
    }    
  }catch(err){
    res.status('400').send(JSON.stringify(err));
    console.error(err);
  }finally{
    client.close();
  }
});

//used to inform front end about user status so that the interface can be apropreately rended.
router.route('/get-user')
.get((req, res) => {
  if(req.session.loggedin){
    const{admin, loggedin, username} = req.session;
    res.send(JSON.stringify({admin: admin, loggedin: loggedin, username: username}));
  }else{
    res.send(JSON.stringify({admin: false, loggedin: false, username: 'Guest'}));
  }
});

//provides blog article data from db
router.route('/get-article')
.get( async(req, res) => {
  const client = MongoClient(db_url, mongoOps);
  try{
    //1)Delcare req consts
    const artId = req.query.id;
    console.log(artId)

    //2)Connect to DB
    await client.connect();
    const articleStore = client.db('blogsystem').collection('articles');

    //3)Check for ID
    let dbRes = null;
    if(artId) dbRes = await articleStore.findOne({_id: new db.ObjectId(artId)});
    else throw new Error('No ID found.');

    //4)Return Data
    res.send(dbRes);

  }catch(error){
    console.log(error);
    res.send(JSON.stringify(error));

  }finally{
    //last disconect from db
    client.close();

  }
});

//used to create and up blog articles in db 
router.route('/set-article')
.post( async(req, res) => {
  let client = null;
  try{
    //1)Check for admin rights
    if(!req.session.admin){
      return res.status(401).send('Missing authorisation to post articals');
    }
  
    //2)Delcare req constants
    const artId = req.query.id;
    const objId = new db.ObjectId(artId);
    const data = req.body;
  
    //3)Connect to DB
    client = await MongoClient.connect(db_url, mongoOps);
    const articleStore = client.db('blogsystem').collection('articles');
  
    //4) If an ID was provided, see check that it is valid.
    if(artId){
      const idValide = await articleStore.findOne({ _id: objId });
  
      //4.a If ID valid then update db, else throw error 
      if(idValide) {
        const mongoRes = await articleStore.replaceOne({ _id: objId}, data);
        console.log(mongoRes);
        if(mongoRes.matchedCount === 1){
          res.status(200).send({ _id: objId, message: 'sussessfully replaced db entry'});
        }
      }else {
        res.status(422).send('Failed to update article as its id could not be found in db.');
      }
    }
  
    //5 If no ID provided incert new entry into db and return new ID to user
    if(!artId){
      const newarticle = await articleStore.insertOne(data);
      const jData = JSON.stringify(newarticle.insertedId);
      res.send(jData);
    }

  }catch(error){
    console.log(error);
    res.send(JSON.stringify(error));

  }finally{
    client.close();

  }
});

router.route('/get_character_configs')
.get( async(req, res) => {
  const client = MongoClient(db_url, mongoOps);
  try{
    //1)Delcare req consts
    const configId = req.query.id;

    //2)Connect to DB
    await client.connect();
    const articleStore = client.db('rpgCharacterManager').collection('character_generation_configs');

    //3)Check for ID
    let dbRes = null;
    if(configId) dbRes = await articleStore.findOne({_id: new db.ObjectId(configId)});
    else throw new Error('No ID found.');

    //4)Return Data
    res.send(dbRes);

  }catch(error){
    console.log(error);
    res.send(JSON.stringify(error));

  }finally{
    //last disconect from db
    client.close();
  }
});

module.exports = router;