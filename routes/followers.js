const express = require('express');
const router = express.Router();
const request = require('../services/requests');;

router.get('/:followers', function(req, res, next) {
  let login = req.params.followers;
  let uri = `${process.env.GITHUB_USER}${login}/followers`;

  request.doRequest(uri, res, login);
});

module.exports = router;
