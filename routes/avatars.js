const express = require('express');
const Request = require('request');
const router = express.Router();

router.get('/', function(req, res, next) {
  let date = new Date();
  let lastModified = new Date(date - 10000);
  console.log('utc: ', lastModified.getDate());
  let countPage = 2;
  const gitHub = {
    headers: {
      'User-Agent': process.env.USERAGENT,
      'If-None-Match': "c0f459ba51d4153b12424a882726357b",
      'If-Modified-Since': 'Mon, 26 Nov 2018 17:06:47 GMT'
    },
    uri: process.env.GITHUB_API + '?since=1000&page=' + countPage + '&per_page=100'
  };
  // console.log('request: ', gitHub);
  Request.get(gitHub, (error, response, body) => {
    if(error) {
      return console.log(error);
    }
    eTag = response.headers.etag;
    console.log('link: ', response.headers);
    console.log('remaining: ', response.headers['x-ratelimit-remaining']);
    console.log('etag: ', eTag);
    let avatars = refineOutput(body,eTag);

    res.send(avatars);
  });
});

router.get('/:login', function(req, res, next) {
  let countPage = 2;
  let login = req.params.login;
  const gitHub = {
    headers: {
      'User-Agent': process.env.USERAGENT,
      'If-None-Match': "c0f459ba51d4153b12424a882726357b",
    },
    uri: process.env.GITHUB_USER + login
  };
  Request.get(gitHub, (error, response, body) => {
    if(error) {
      return console.log(error);
    }
    eTag = response.headers.etag;
    console.log('link: ', response.headers.link);
    console.log('remaining: ', response.headers['x-ratelimit-remaining']);
    console.log('etag: ', eTag);
    let avatars = refineDetails(body);

    res.send(JSON.parse(body));
  });
});

function refineOutput(body, etag) {
  let repos = [];
  let response = [];
  let jBody = JSON.parse(body);

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

function parseDetails(body) {
  let response = [];
  let jBody = JSON.parse(body);

  jBody.forEach(detail => {
    response.push({
      name: detail.name,
      company: detail.company,
      followers: detail.followers,
      locaion: detail.location
    });
  });
  return response;
}

function checkForA(user) {
  let login = user.login;

  return login.toLowerCase().startsWith('a') ? true : false;
}

module.exports = router;
