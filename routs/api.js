const bcrypt = require('bcrypt');
const db_url = (process.env.DB_URL || 'mongodb://localhost:27017');
const express = require('express');
const Joi = require('joi');
const salt = parseInt(process.env.SALT_ONE);
const mongoClient = require('mongodb').MongoClient;
const router = express.Router();

router.route('/is-user')
.get( async (req, res) => {
    const name = req.query.username;
    if(name){
        client = await mongoClient.connect(db_url, {useUnifiedTopology: true});
        const collection = client.db('blogsystem').collection('users');
        const foundUser = await collection.findOne({username: name});
        if(foundUser){
            res.send(true);
        }
    }
});

router.route('/new-user')
.get( (req, res) => {
})
.post( async (req, res) => {
    const data = req.body;
    console.log(data);

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
      
      req.session.username = newUser.ops[0].username;
      req.session.loggedin = true;
      req.session.admin = false;
      res.redirect('/');
      
    }catch(err){
      res.status('400').send(err);
      console.error(err);
    }finally{
      client.close();
    }
});

module.exports = router;