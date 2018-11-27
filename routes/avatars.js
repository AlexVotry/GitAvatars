const express = require('express');
const router = express.Router();
const request = require('../services/requests');

router.get('/', function(req, res, next) {
  let countPage = 2;
  let id = 'root';
  const gitHub = {
    headers: {
      'User-Agent': process.env.USERAGENT,
      'If-None-Match': "c0f459ba51d4153b12424a882726357b",
      'If-Modified-Since': 'Tue, 27 Nov 2018 17:06:47 GMT'
    },
    uri: `${process.env.GITHUB_API}?since=1000&page=2&per_page=100`
  };

  request.doRequest(gitHub, res, id);
});

router.get('/:login', function(req, res, next) {
  let id = 'login';
  let countPage = 2;
  let login = req.params.login;
  const gitHub = {
    headers: {
      'User-Agent': process.env.USERAGENT,
      'If-None-Match': "c0f459ba51d4153b12424a882726357b",
      'If-Modified-Since': 'Tue, 27 Nov 2018 17:06:47 GMT'
    },
    uri: process.env.GITHUB_USER + login
  };

  request.doRequest(gitHub, res, id);
});

module.exports = router;
