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
const index = require('./routs/index');
const blog = require('./routs/blog');
const projects = require('./routs/projects');
const path = require('path');
const port = (process.env.PORT || 3000);
const session = require('express-session');
const hash = process.env.HASH_ONE;

//settings
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//middlewear
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const sess = {
  secret: hash,
  resave: false,
  saveUninitialized: true,  
  cookie: {}
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
