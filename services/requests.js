const Request = require('request');
const _ = require('lodash');

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
    console.log('header: ', gitHub);
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
      } else {
        jBody = body;
      }
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

      res.send(avatars);
    });
  }
}

function parseAvatars(body, uri) {
  if (!body) {
    return _.result(_.find(avatarList, { 'uri': uri }), 'repos');
  }
  let repos = [];
  body.forEach(repo => {
    repos.push({
      id: repo.id,
      login: repo.owner.login,
      avatar: repo.owner.avatar_url,
      followers: checkForA(repo.owner),
    });
  });
  avatarList.push({ uri: uri, repos: repos });
  return repos;
};

function parseDetails(detail, uri) {
  if (!detail) {
    return _.result(_.find(detailList, { 'uri': uri }), 'details');
  }
  let details = {
    login: detail.login,
    name: detail.name,
    company: detail.company,
    followers: detail.followers,
    location: detail.location,
    html_url: detail.html_url,
    avatar: detail.avatar_url
  };
  detailList.push({ uri: uri, details: details })
  return details;
}

function parseFollowers(body, login, uri) {
  if (!body) {
    return _.result(_.find(followerList, { 'uri': uri }), 'followers');
  }
  let followers = [];
  let response = [];

  body.forEach(follower => {
    followers.push({
      login: follower.login,
      avatar: follower.avatar_url
    });
  });

  response.push(followers, login);
  followerList.push({ uri: uri, followers: response });
  return response;
};

function checkForA(user) {
  let login = user.login;

  return login.toLowerCase().startsWith('a') ? true : false;
}
