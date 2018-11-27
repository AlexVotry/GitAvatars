const Request = require('request');
let ifNoneMatch = [];
let modifiedDate = new Date();
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
      let etag = response.headers.etag;

      // if(ifNoneMatch.indexOf(etag) === -1) {
      //   ifNoneMatch.push(etag);
      // }
      console.log(response.headers.status);
      console.log('remaining: ', response.headers['x-ratelimit-remaining']);
      if(body) {
        let jBody = JSON.parse(body);
        if (id == 'login') {
          avatars = parseDetails(jBody);
        } else if (id == 'search') {
          let arr = jBody.items;
          avatars = parseAvatars(arr);
        } else if (id == 'root') {
          avatars = parseAvatars(jBody);
        } else {
          avatars = parseFollowers(jBody, id)
        }
      }

      res.send(avatars);
    });
  }
}

function parseAvatars(body) {
  if (!body) {
    return;
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

  return repos;
};

function parseDetails(detail) {
  if (!detail) {
    return;
  }
  return {
    login: detail.login,
    name: detail.name,
    company: detail.company,
    followers: detail.followers,
    location: detail.location,
    html_url: detail.html_url,
    avatar: detail.avatar_url
  };
}

function parseFollowers(body, login) {
  if (!body) {
    return;
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
  return response;
};

function checkForA(user) {
  let login = user.login;

  return login.toLowerCase().startsWith('a') ? true : false;
}
