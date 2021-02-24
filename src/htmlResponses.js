const fs = require('fs');

const errorPage = fs.readFileSync(`${__dirname}/../client/error.html`);
const clientPage = fs.readFileSync(`${__dirname}/../client/joke-client.html`);
const homePage = fs.readFileSync(`${__dirname}/../client/home-page.html`);

const getHtmlResponse = (request, response, page, code) => {
  response.writeHead(code, { 'Content-Type': 'text/html' });
  response.write(page);
  response.end();
};

const get404Response = (request, response) => {
  getHtmlResponse(request, response, errorPage, 404);
};

const getClientResponse = (request, response) => {
  getHtmlResponse(request, response, clientPage, 200);
};

const getHomeResponse = (request, response) => {
  getHtmlResponse(request, response, homePage, 200);
};

module.exports = {
  get404Response,
  getClientResponse,
  getHomeResponse,
};
