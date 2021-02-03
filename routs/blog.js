const express = require('express');
const router = express.Router();
const {postBriefs} = require('../useful-funcs/db-methods.js');
const helmet = require('helmet');
const blogCSP = {
  directives: {
    ...helmet.contentSecurityPolicy.getDefaultDirectives(),
    'base-uri': ["'self'"],
    'block-all-mixed-content': [],
    'default-src': ["'self'"],
    'object-src': ["'none'"],
    'script-src': ["'self'"],
    'script-src-elem': ["'self'", "unpkg.com", "cdn.jsdelivr.net"],
    'script-src-attr': ["'self'"],
    'style-src': ["'self'"],
    'style-src-elem': ["'self'", "cdn.jsdelivr.net", "'unsafe-inline'"],
    'upgrade-insecure-requests': [],
  },

}

router.route('/')
.get( async(req, res) => {
  res.locals.postBriefs = await postBriefs(50);
  res.render('blog/blog');
});

router.route('/article')
.get(helmet.contentSecurityPolicy(blogCSP), (req, res) => {
  res.render('blog/article-view');
})

module.exports = router;