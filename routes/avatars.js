const express = require('express');
const router = express.Router();
const request = require('../services/requests');

let prevId = [1000];
let index = 0;

router.get('/', function(req, res, next) {
  let id = 'root';
  let uri =  `${process.env.GITHUB_API}?since=1000&per_page=100`;
  request.doRequest(uri, res, id);
});

router.get('/:login', function(req, res, next) {
  let id = 'login';
  let login = req.params.login;
  let uri = process.env.GITHUB_USER + login;

  request.doRequest(uri, res, id);
});

router.get('/next/:id', function(req, res, next) {
  let id = 'root';
  index++;
  let lastId = req.params.id;
  prevId.push(lastId);
  let uri = `${ process.env.GITHUB_API }?since=${ lastId }&per_page=100`;

  request.doRequest(uri, res, id);
});

router.get('/prev/avatars', function(req, res, next) {
  let id = 'root';
  index--;
  prevId.pop();
  let uri = `${ process.env.GITHUB_API }?since=${ prevId[index] }&per_page=100`;

  request.doRequest(uri, res, id);
});

module.exports = router;
