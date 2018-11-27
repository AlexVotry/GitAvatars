const express = require('express');
const router = express.Router();
const request = require('../services/requests');;

router.get('/:filter/:query', function(req, res, next) {
  let filter =(req.params.filter).toLowerCase();
  let query = (req.params.query).toLowerCase();
  let id = 'search';
  const gitHub = {
    headers: {
      'User-Agent': process.env.USERAGENT,
      'If-None-Match': "c0f459ba51d4153b12424a882726357b",
      'If-Modified-Since': 'Tue, 27 Nov 2018 17:06:47 GMT'
    },
    uri: process.env.GITHUB_SEARCH + filter + ':' + query + '&sort=stars&order=desc&per_page=100'
  };

  request.doRequest(gitHub, res, id);
});

module.exports = router;
