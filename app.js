/* 
TODO
1) try converting declarations to ES6
2) set up .env file
  -handle db url in that file
3) Consider seperating all db routing in to seperate router
*/

//declarations
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const index = require('./routs/index');
const blog = require('./routs/blog');
const projects = require('./routs/projects');
const path = require('path');
const port = (process.env.PORT || 3000);

//settings
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//middlewear
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routing
app.use('/', index);
app.use('/blog', blog);
app.use('/projects', projects);
app.use(express.static(path.join(__dirname, '/public')));


//misc.
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
