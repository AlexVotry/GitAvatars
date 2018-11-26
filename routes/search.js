const express = require('express');
const Request = require('request');
const router = express.Router();

router.get('/:filter/:query', function(req, res, next) {
  let filter =(req.params.filter).toLowerCase();
  let query = (req.params.query).toLowerCase();
  const gitHub = {
    headers: {
      'User-Agent': process.env.USERAGENT,
      'If-None-Match': "c0f459ba51d4153b12424a882726357b",
    },
    uri: process.env.GITHUB_SEARCH + filter + ':' + query + '&sort=stars&order=desc'
  };
console.log('request: ', gitHub);
  Request.get(gitHub, (error, response, body) => {
    if(error) {
      return console.log(error);
    }
    eTag = response.headers.etag;
    console.log('remaining: ', response.headers['x-ratelimit-remaining']);
    let avatars = refineOutput(body, eTag);
    res.send(avatars);
  });
});

function refineOutput(body, etag) {
  let repos = [];
  let response = [];
  let obj = JSON.parse(body);
  let jBody = obj.items;
  jBody.forEach(repo => {
    repos.push({
      id: repo.id,
      login: repo.owner.login,
      avatar: repo.owner.avatar_url,
      followers: checkForA(repo.owner),
      details: repo.owner.url
    });
  });

  response.push(repos, etag);
  return response;
};

function checkForA(user) {
  let login = user.login;

  return login.toLowerCase().startsWith('a') ? true : false;
}

module.exports = router;
