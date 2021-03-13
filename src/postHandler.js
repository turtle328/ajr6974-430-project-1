const query = require('querystring');
const jsonHandler = require('./responses');

// generic method for handling x-www-form-urlencoded POST requests
// it will call a callback method once the data from the POST is fully collected
const handePost = (request, response, callback) => {
  const body = [];

  request.on('error', (err) => {
    console.dir(err);
    response.statusCode = 400;
    response.end();
  });

  request.on('data', (chunk) => {
    body.push(chunk);
  });

  request.on('end', () => {
    const bodyString = Buffer.concat(body).toString();
    const bodyParams = query.parse(bodyString);

    callback(request, response, bodyParams);
  });
};

// POST method for adding or modifying team data on the server
const addTeam = (request, response) => {
  handePost(request, response, jsonHandler.addTeam);
};

// POST method for deleting a user and its team data on the server
const deleteUser = (request, response) => {
  handePost(request, response, jsonHandler.deleteUser);
};

module.exports = {
  addTeam,
  deleteUser,
};
