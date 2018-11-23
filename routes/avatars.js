const express = require('express');
const Request = require('request');
const router = express.Router();

 // https://api.github.com/search/users?q=tom+repos:%3E42+followers:%3E1000

router.get('/', function(req, res, next) {
  const gitHub = {
    headers: {
      'User-Agent': process.env.USERAGENT
    },
    uri: process.env.GITHUB_API
  };
  Request.get(gitHub, (error, response, body) => {
    if(error) {
      return console.log(error);
    }
    let avatars = refineOutput(body);
    res.send(avatars);
  });
});

// router.get('/:id', function(req, res, next) {
//   let id = req.params.id;
//   const gitHub =  process.env.GITHUB_API;
//
//   Request.get(`${weatherUrl}/${location}`, (error, response, body) => {
//     if(error) {
//       return console.log(error);
//     }
//       console.log('ENV: ', process.env.WEATHER_API);
//     res.send(body);
//   });
//
// });
function refineOutput(body) {
  let users = [];
  let jBody = JSON.parse(body);
  
  jBody.forEach(user => {
    users.push({
      login: user.login,
      avatar: user.avatar_url,
      followers: user.followers_url,
      details: user.url
    });
  });
  return users;
};

module.exports = router;
