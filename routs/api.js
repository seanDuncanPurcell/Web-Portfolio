const bcrypt = require('bcrypt');
const db_url = (process.env.DB_URL || 'mongodb://localhost:27017');
const express = require('express');
const Joi = require('joi');
const salt = parseInt(process.env.SALT_ONE);
const mongoClient = require('mongodb').MongoClient;
const router = express.Router();

router.route('/user')
.get(async (req, res) => {
    const name = req.query.username;
    if(name){
        client = await mongoClient.connect(db_url, {useUnifiedTopology: true});
        const collection = client.db('blogsystem').collection('users');
        const foundUser = await collection.findOne({username: name});
        if(foundUser){
            res.send('Found User');
        }
    }
});

module.exports = router;