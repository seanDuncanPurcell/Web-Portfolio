const bcrypt = require('bcrypt');
const db_url = (process.env.DB_URL || 'mongodb://localhost:27017');
const express = require('express');
const salt = parseInt(process.env.SALT_ONE);
const mongoClient = require('mongodb').MongoClient;
const router = express.Router();

router.route('/')
.get((req, res) => {  
  res.render('home', {loggedin: req.session.log, user: req.session.username});
});

router.route('/register')
.get((req, res) => {
  res.render('user/register', {loggedin: req.session.log, user: req.session.username});
})
.post( async (req, res) => {
  const data = req.body;

  try{
    const client = await mongoClient.connect(db_url, {useUnifiedTopology: true});
    const collection = client.db('blogsystem').collection('users');
    const foundName = await collection.findOne({username: data.userName});

    if (foundName){
      let resString;
      if (foundName) resString = 'That name is already in use, please select another';
      client.close();
      res.send(resString);
    } else {
      const encrypt = await bcrypt.hash(req.body.password, 10);
      collection.insertOne({
        username: req.body.username,
        email: req.body.email,
        password: encrypt
      }, (err, result) => {
        if(err) throw new Error(err);
        client.close();
      });

      res.redirect('/')
    }
  }catch(err){
    console.error('error: ' + err);
  }
});

router.route('/login')
.get((req, res)=>{
  res.render('user/login', {loggedin: req.session.log, user: req.session.username});
})
.post(async (req, res)=>{  
  try{
    const data = req.body;
    const client = await mongoClient.connect(db_url, {useUnifiedTopology: true});
    const collection = client.db('blogsystem').collection('users');
    const foundUser = await collection.findOne({username: data.username});
  
    if (foundUser){
      const authorised = await bcrypt.compare(data.password, foundUser.password);
      if (authorised) {
        req.session.log = true;
        req.session.username = foundUser.username;
        console.log(req.session.username);
        res.redirect('/');
      }
      else {
        client.close();
        const err = 'That is not the correct password';
        res.render('/login', {error: err, loggedin: req.session.log, user: req.session.username});
      }
    } else {
      client.close();
      res.send('The user name you have entered was not foun in the data base.');
    }  
  }catch(err){
    console.error('error: ' + err);
  }
});

module.exports = router;