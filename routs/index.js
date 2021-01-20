const bcrypt = require('bcrypt');
const db_url = (process.env.DB_URL || 'mongodb://localhost:27017');
const db_name = 'blogsystem';
const express = require('express');
const Joi = require('joi');
const mongoClient = require('mongodb').MongoClient;
const router = express.Router();
const {postBriefs, projectCards} = require('../useful-funcs/db-methods');
const mongoose = require('mongoose');
const { RateLimiterMongo } = require('rate-limiter-flexible');
const mongoConn = mongoose.createConnection(`${db_url}/${db_name}`, {
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 100, // Reconnect every 100ms
});

//set limits for password brute force
const maxConsecutiveFailsByUsername = 5;
const limiterConsecutiveFailsByUsername = new RateLimiterMongo({
  storeClient: mongoConn,
  keyPrefix: 'login_fail_consecutive_username',
  points: maxConsecutiveFailsByUsername,
  duration: 60 * 60 * 3, // Store number for three hours since first fail
  blockDuration: 60 * 15, // Block for 15 minutes
});

//routs
router.route('/')
.get( async(req, res) => {
  res.locals.postBriefs = await postBriefs(20);
  res.locals.projectCards = await projectCards();
  if (req.query.out){
    req.session.destroy();
    res.redirect('/');
  }else{
    res.render('home');
  }
});

router.route('/register')
.get((req, res) => {
  res.render('user/register');
})

router.route('/login')
.get((req, res)=>{
  res.render('user/login');
})
.post(async (req, res)=>{
  //if blog comments are implimented, then this should be changed to email
  const username = req.body.username;
  const rlResUsername = await limiterConsecutiveFailsByUsername.get(username);
  const errMsg = 'Incorect username and pass-phrase combination.';
  let client;

  try{
    //1) confirm user has remaining attempts to enter pass word
    if (rlResUsername !== null && rlResUsername.consumedPoints > maxConsecutiveFailsByUsername) {
      const retrySecs = Math.round(rlResUsername.msBeforeNext / 1000) || 1;
      res.set('Retry-After', String(retrySecs));
      res.status(429).send('Too Many Attempts');
    } else {
      //deliration
      const data = req.body;
      client = await mongoClient.connect(db_url, {useUnifiedTopology: true});
      const collection = client.db('blogsystem').collection('users');
  
      //2) validate inputs
      const schema = Joi.object({
        username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
        password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{4,30}$'))
        .required()
      });
      const joiResponce = schema.validate(data);
      if (joiResponce.error) {        
        res.status(401);   
        throw new Error('Improper Username or Pass-Phrase.')
      };
  
      //3) validate username
      const foundUser = await collection.findOne({username: data.username});
      if (!foundUser) {
        res.status(401);   
        throw new Error(errMsg);
      }
  
      //4) validate password
      const authorised = await bcrypt.compare(data.password, foundUser.password);
      if (!authorised) {
        //4.a) consume point from ratelimitter
        const rlResponce = await limiterConsecutiveFailsByUsername.consume(username);
        res.status(401);   
        throw new Error(errMsg);
      }else{
        //4.b) clear failed login counter
        await limiterConsecutiveFailsByUsername.delete(username);
      }
  
      //5) update session informaiton
      req.session.loggedin = true;
      req.session.username = foundUser.username;        
      req.session.admin = foundUser.admin;
      res.redirect('/');
    }
  }catch(err){
    console.error(err); 
    res.render('user/login', {error: err});
  }finally{
    client.close();
  }
});

module.exports = router;