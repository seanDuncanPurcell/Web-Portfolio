/*
TODO
1) Form validation for sign in/up @ cient & server side.
*/

const bcrypt = require('bcrypt');
const db_url = (process.env.DB_URL || 'mongodb://localhost:27017');
const express = require('express');
const Joi = require('joi');
const salt = parseInt(process.env.SALT_ONE);
const mongoClient = require('mongodb').MongoClient;
const router = express.Router();

router.route('/')
.get((req, res) => {  
  if (req.query.out){
    req.session.destroy();
    res.render('home');
  }else{
    res.render('home');
  }
});

router.route('/register')
.get((req, res) => {
  res.render('user/register');
})
.post( async (req, res) => {
  const data = req.body;
  const schema = Joi.object({
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{4,30}$'))
      .required(),
    repeat_password: Joi.ref('password'),
  });
  const client = await mongoClient.connect(db_url, {useUnifiedTopology: true});
  const collection = client.db('blogsystem').collection('users');

  try{
    const foundName = await collection.findOne({username: data.username});
    const foundemail = await collection.findOne({username: data.email});
    const joiResponce = schema.validate(data);

    if (foundName) throw new Error('That username is already in use.');
    else if (foundemail) throw new Error('That email is already in use.');
    else if (joiResponce.error) throw new Error(joiResponce.error.details[0].message);

    const encrypt = await bcrypt.hash(req.body.password, salt);
    const newUser = await collection.insertOne({
      username: req.body.username,
      email: req.body.email,
      password: encrypt,
      admin: false
    });
    console.log();
    
    req.session.username = newUser.ops[0].username;
    req.session.loggedin = true;
    req.session.admin = false;
    res.redirect('/');

    
    console.log(`Logged in: ${req.session.loggedin}  User: ${req.session.username}`);
  }catch(err){
    res.status('400').send(err);
    console.error(err);
  }finally{
    client.close();
  }
});

router.route('/login')
.get((req, res)=>{
  res.render('user/login');
})
.post(async (req, res)=>{
  let client;
  try{
    //deliration
    const data = req.body;
    client = await mongoClient.connect(db_url, {useUnifiedTopology: true});
    const collection = client.db('blogsystem').collection('users');

    //1) validate inputs
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
    if (joiResponce.error) throw new Error(joiResponce.error.details[0].message);

    //2) validate username
    const foundUser = await collection.findOne({username: data.username});
    if (!foundUser) throw new Error('Incorect password username combination.');

    //3) validate password
    const authorised = await bcrypt.compare(data.password, foundUser.password);
    if (!authorised) throw new Error('Incorect password username combination.');

    //4) update session informaiton
    req.session.loggedin = true;
    req.session.username = foundUser.username;        
    req.session.admin = foundUser.admin;
    res.redirect('/');

  }catch(err){
    console.error(err);
    res.status(401).send(err);
  }finally{
    client.close();
  }
});

router.route('/user')
.get((req, res) => {
  const{admin, loggedin, username} = req.session;
  res.send(JSON.stringify({admin: admin, loggedin: loggedin, username: username}));
});

module.exports = router;