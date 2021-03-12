const query = require('querystring');
const jsonHandler = require('./responses');

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

    // jsonHandler.addTeam(request, response, bodyParams);
    callback(request, response, bodyParams);
  });
};

const addTeam = (request, response) => {
  handePost(request, response, jsonHandler.addTeam);
};

const deleteUser = (request, response) => {
  handePost(request, response, jsonHandler.deleteUser);
};

module.exports = {
  addTeam,
  deleteUser,
};
