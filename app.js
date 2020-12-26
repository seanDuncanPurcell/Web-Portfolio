const bodyParser = require('body-parser');
const express = require('express');
  const app = express();
const index = require('./routs/index');
const blog = require('./routs/blog');
const projects = require('./routs/projects');
const path = require('path');
const { render } = require('pug');
const port = (process.env.PORT || 3000);

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', index);
app.use('/blog', blog);
app.use('/projects', projects);
app.use(express.static(path.join(__dirname, '/public')));

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
