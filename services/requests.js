const Request = require('request');

module.exports = {
  doRequest: function doRequest(gitHub, res, id) {
    Request.get(gitHub, (error, response, body) => {
      if(error) {
        return console.log(error);
      }
      let avatars;
      eTag = response.headers.etag;
      console.log('remaining: ', response.headers['x-ratelimit-remaining']);
      let jBody = JSON.parse(body);
      if (id == 'login') {
        avatars = parseDetails(jBody);
      } else if (id == 'search') {
        let arr = jBody.items;
        avatars = parseAvatars(arr, eTag);
      } else if (id == 'root') {
        avatars = parseAvatars(jBody, eTag);
      } else {
        avatars = parseFollowers(jBody, eTag, id)
      }

      res.send(avatars);
    });
  }
}

function parseAvatars(body, etag) {
  let repos = [];
  let response = [];
  body.forEach(repo => {
    repos.push({
      id: repo.id,
      login: repo.owner.login,
      avatar: repo.owner.avatar_url,
      followers: checkForA(repo.owner),
    });
  });

  response.push(repos, etag);
  return response;
};

function parseDetails(detail) {
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

function parseFollowers(body, etag, login) {
  let repos = [];
  let response = [];

  body.forEach(repo => {
    repos.push({
      login: repo.login,
      avatar: repo.avatar_url
    });
  });

  response.push(repos, etag, login);
  return response;
};

function checkForA(user) {
  let login = user.login;

  return login.toLowerCase().startsWith('a') ? true : false;
}
