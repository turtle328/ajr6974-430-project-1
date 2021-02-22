const fs = require('fs');

const errorPage = fs.readFileSync(`${__dirname}/../client/error.html`);
const clientPage = fs.readFileSync(`${__dirname}/../client/joke-client.html`);

const getHtmlResponse = (request, response, page) => {
  response.writeHead(404, { 'Content-Type': 'text/html' });
  response.write(page);
  response.end();
};

const get404Response = (request, response) => {
  getHtmlResponse(request, response, errorPage);
};

const getClientResponse = (request, response) => {
  getHtmlResponse(request, response, clientPage);
};

module.exports = {
  get404Response,
  getClientResponse,
};
