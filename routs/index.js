const bcrypt = require('bcrypt');
const express = require('express');
const db_url = 'mongodb://localhost:27017';
const mongoClient = require('mongodb').MongoClient;
const router = express.Router();

router.route('/')
.get((req, res) => {  
  res.render('home');
});

router.route('/register')
.get((req, res) => {
  res.render('register');
})
.post( async (req, res) => {
  const data = req.body;
  console.log('New User:');
  console.log(data);

  try{
  const client = await mongoClient.connect(db_url, {useUnifiedTopology: true});
  const collection = await client.db('blogsystem').collection('users');
  const foundName = await collection.findOne({username: data.userName});
  const foundEmail = await collection.findOne({email: data.email});

  if (foundName || foundEmail){
    let resString;
    if (foundName && foundEmail) resString = 'Both your name and email are in use, would you like to have your passcode sent to you?';
    else if (foundName) resString = 'That name is already in use, please select another';
    else if(foundEmail) resString = 'That email is alread in use, shoud I send the password to that account?';
    console.error(resString);
    client.close();
  } else {
    const encrypt = await bcrypt.hash(req.body.passWord, 10);

    collection.insertOne({
      username: req.body.userName,
      email: req.body.email,
      pass: encrypt
    }, (err, result) => {
      if(err) throw new Error(err);
      client.close();
    });
  }  

  }catch(err){
    console.error('error: ' + err);
  }
});

module.exports = router;