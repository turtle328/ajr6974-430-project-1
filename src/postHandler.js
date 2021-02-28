const query = require('querystring');
const jsonHandler = require('./responses');

const addTeam = (request, response) => {
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

    jsonHandler.addTeam(request, response, bodyParams);
  });
};

module.exports = {
  addTeam,
};
