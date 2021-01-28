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
6) DONE>>Implement node-rate-limiter-flexible
7) Implement Helmet
8) DONE>>PostBriefs needs to be removed from middle wear as it is no long used that way.
  -it could be add to a new microservice dir.
*/

//declarations
require('dotenv').config(); //reads hidden/global declarations for .env file
const bodyParser = require('body-parser');
const db_url = `mongodb+srv://${process.env.DB_LOGIN}@cluster0.c3kth.mongodb.net/admin?retryWrites=true&w=majority`;
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
const mongoOps = { useNewUrlParser: true, useUnifiedTopology: true };
const store = new MongoDBStore({
  uri: db_url,
  databaseName: 'blogsystem',
  collection: 'mySessions',
  expires: 1000 * 60 * 60 * 24, // 24hr in milliseconds
  connectionOptions: mongoOps
});
const sess = (() => {
    const retObj = {
    secret: hash,
    store: store,
    resave: false,
    saveUninitialized: true,  
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 24 hr
      name: 'sessionId', //recomened by express api doc for preventing fingerprinting of server and targeted attacks
    }
  } 
  if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
  }
  return retObj;
})()
store.on('error', error => console.log(error));//error cataching
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//middlewear
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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