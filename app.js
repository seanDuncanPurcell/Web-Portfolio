/* 
TODO
1) IGNOR>>try converting declarations to ES6
2) DONE>>set up .env file
  -DONE>>handle db url in that file
3) Consider seperating all db routing in to seperate router
4) Consider establishing user roles with bubble up privliages.
  -only admin can delete any db enty but non-admin can delet their own db entries.
  --maybe some add some form of signature to articales.
5) Implement mongoose
6) Implement node-rate-limiter-flexible
7) Implement Helmet
8) DONE>>PostBriefs needs to be removed from middle wear as it is no long used that way.
  -it could be add to a new microservice dir.
*/

//declarations
require('dotenv').config();
const bodyParser = require('body-parser');
const db_url = (process.env.DB_URL || 'mongodb://localhost:27017');
const express = require('express');
  const app = express();
const hash = process.env.HASH_ONE;
const path = require('path');
const port = (process.env.PORT || 3000);
const session = require('express-session');
  const MongoDBStore = require('connect-mongodb-session')(session);

//Declarations, Routs
const index = require('./routs/index');
const bio = require('./routs/profile');
const blog = require('./routs/blog');
const projects = require('./routs/projects');
const api = require('./routs/api');

//Delclarations, Middleware
const {sessionTwoLocal} = require('./middleware/middleware');

//settings
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
const store = new MongoDBStore({
  uri: db_url,
  databaseName: 'blogsystem',
  collection: 'mySessions',
  expires: 1000 * 60 * 60 * 24, // 24hr in milliseconds
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
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    name: 'sessionId', //recomened by express api doc for preventing fingerprinting of server and targeted attacks
  }
} 
if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}
app.use(session(sess));
app.use(sessionTwoLocal);

//Routing
app.use('/', index);
app.use('/api', api);
app.use('/bio', bio);
app.use('/blog', blog);
app.use('/projects', projects);
app.use(express.static(path.join(__dirname, '/public')));


//misc.
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
