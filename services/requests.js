const Request = require('request');
const cache = require('memory-cache');

let ifNoneMatch = [];
let modifiedDate = new Date();
let avatarList = [];
let followerList = [];
let detailList = [];

module.exports = {
  doRequest: function doRequest(uri, res, id) {
    const gitHeader = {
      'User-Agent': process.env.USERAGENT,
      'If-None-Match': ifNoneMatch.toString(','),
      'If-Modified-Since': modifiedDate
    };
    const gitHub = {
      headers: gitHeader,
      uri: uri
    };
    Request.get(gitHub, (error, response, body) => {
      if(error) {
        return console.log(error);
      }

      let avatars;
      let jBody;
      let etag = response.headers.etag;

      if(ifNoneMatch.indexOf(etag) === -1) {
        ifNoneMatch.push(etag);
      }
      console.log(response.headers.status);
      console.log('remaining: ', response.headers['x-ratelimit-remaining']);
      if(body) {
        jBody = JSON.parse(body);
        if (id == 'login') {
          avatars = parseDetails(jBody, uri);
        } else if (id == 'search') {
          let arr = jBody.items;
          avatars = parseAvatars(arr, uri);
        } else if (id == 'root') {
          avatars = parseAvatars(jBody, uri);
        } else {
          avatars = parseFollowers(jBody, id, uri)
        }
      } else {
        avatars = cache.get(uri)
      }
      res.send(avatars);
    });
  }
}

function parseAvatars(body, uri) {
  let repos = [];
  body.forEach(repo => {
    repos.push({
      id: repo.id,
      login: repo.owner.login,
      avatar: repo.owner.avatar_url,
      followers: checkForA(repo.owner),
    });
  });
  cache.put(uri, repos);
  return repos;
};

function parseDetails(detail, uri) {
  let details = {
    login: detail.login,
    name: detail.name,
    company: detail.company,
    followers: detail.followers,
    location: detail.location,
    html_url: detail.html_url,
    avatar: detail.avatar_url
  };
  cache.put(uri, details);
  return details;
}

function parseFollowers(body, login, uri) {
  let followers = [];
  let response = [];

  body.forEach(follower => {
    followers.push({
      login: follower.login,
      avatar: follower.avatar_url
    });
  });

  response.push(followers, login);
  cache.put(uri, response);
  return response;
};

function checkForA(user) {
  let login = user.login;

  return login.toLowerCase().startsWith('a') ? true : false;
}
