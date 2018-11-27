const express = require('express');
const router = express.Router();
const request = require('../services/requests');;

router.get('/:followers', function(req, res, next) {
  let login = req.params.followers;
  const gitHub = {
    headers: {
      'User-Agent': process.env.USERAGENT,
      'If-None-Match': "c0f459ba51d4153b12424a882726357b",
      'If-Modified-Since': 'Tue, 27 Nov 2018 17:06:47 GMT'
    },
    uri: process.env.GITHUB_USER + login + '/followers'
  };

  request.doRequest(gitHub, res, login);
});

module.exports = router;
