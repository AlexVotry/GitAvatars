const express = require('express');
const Request = require('request');
const router = express.Router();

router.get('/:followers', function(req, res, next) {
  let login = req.params.followers;
  const gitHub = {
    headers: {
      'User-Agent': process.env.USERAGENT,
      'If-None-Match': "c0f459ba51d4153b12424a882726357b",
    },
    uri: process.env.GITHUB_USER + login + '/followers'
  };

  Request.get(gitHub, (error, response, body) => {
    if(error) {
      return console.log(error);
    }
    eTag = response.headers.etag;
    // console.log('link: ', response.headers.link);
    console.log('remaining: ', response.headers['x-ratelimit-remaining']);
    let followers = refineOutput(body, eTag, login);

    res.send(followers);
  });
});

function refineOutput(body, etag, login) {
  let repos = [];
  let response = [];
  let jBody = JSON.parse(body);

  jBody.forEach(repo => {
    repos.push({
      login: repo.login,
      avatar: repo.avatar_url
    });
  });

  response.push(repos, etag, login);
  return response;
};

module.exports = router;
