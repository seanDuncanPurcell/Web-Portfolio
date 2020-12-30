/* 
TODO
1) try converting declarations to ES6
2) set up .env file
  -handle db url in that file
3) Consider seperating all db routing in to seperate router
4) Use connect-mongodb-session to store session data in mongodb
*/

//declarations
require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
  const app = express();
const hash = process.env.HASH_ONE;
const index = require('./routs/index');
const blog = require('./routs/blog');
const MongoDBStore = require('connect-mongodb-session')(session);
  const db_url = (process.env.DB_URL || 'mongodb://localhost:27017');
const projects = require('./routs/projects');
const path = require('path');
const port = (process.env.PORT || 3000);
const session = require('express-session');

//settings
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
const store = new MongoDBStore({
  uri: db_url,
  databaseName: 'blogsystem',
  collection: 'mySessions',
  expires: 1000 * 60 * 60 * 24 * 30, // 30 days in milliseconds
  connectionOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000
  }
});
  //error cataching
store.on('error', function(error) {
  console.log(error);
});

//middlewear
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const sess = {
  secret: hash,
  store: store,
  resave: false,
  saveUninitialized: true,  
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  }
} 
if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}
app.use(session(sess));

//Routing
app.use('/', index);
app.use('/blog', blog);
app.use('/projects', projects);
app.use(express.static(path.join(__dirname, '/public')));


//misc.
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
