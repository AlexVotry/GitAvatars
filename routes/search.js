const express = require('express');
const router = express.Router();
const request = require('../services/requests');;

router.get('/:filter/:query', function(req, res, next) {
  let filter =(req.params.filter).toLowerCase();
  let query = (req.params.query).toLowerCase();
  let id = 'search';
  let uri = `${process.env.GITHUB_SEARCH}${filter}:${query}&sort=stars&order=desc&per_page=100`;

  request.doRequest(uri, res, id);
});

module.exports = router;
