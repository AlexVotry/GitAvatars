const express = require('express');
const router = express.Router();
const request = require('../services/requests');

let prevId = [1000];
let index = 0;
let nextId = 1000;

router.get('/', function(req, res, next) {
  let id = 'root';
  const gitHub = {
    headers: {
      'User-Agent': process.env.USERAGENT,
      'If-None-Match': "c0f459ba51d4153b12424a882726357b",
      'If-Modified-Since': 'Tue, 27 Nov 2018 17:06:47 GMT'
    },
    uri: `${process.env.GITHUB_API}?since=1000&per_page=100`
  };

  request.doRequest(gitHub, res, id);
});

router.get('/:login', function(req, res, next) {
  let id = 'login';
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

router.get('/next/:id', function(req, res, next) {
  let id = 'root';
  index++;
  let lastId = req.params.id;
  prevId.push(lastId);
  const gitHub = {
    headers: {
      'User-Agent': process.env.USERAGENT,
      'If-None-Match': "c0f459ba51d4153b12424a882726357b",
      'If-Modified-Since': 'Tue, 27 Nov 2018 17:06:47 GMT'
    },
    uri: `${ process.env.GITHUB_API }?since=${ lastId }&per_page=100`
  };

  request.doRequest(gitHub, res, id);
});

router.get('/prev/avatars', function(req, res, next) {
  let id = 'root';
  index--;
  prevId.pop();
  const gitHub = {
    headers: {
      'User-Agent': process.env.USERAGENT,
      'If-None-Match': "c0f459ba51d4153b12424a882726357b",
      'If-Modified-Since': 'Tue, 27 Nov 2018 17:06:47 GMT'
    },
    uri: `${ process.env.GITHUB_API }?since=${ prevId[index] }&per_page=100`
  };

  request.doRequest(gitHub, res, id);
});

module.exports = router;
