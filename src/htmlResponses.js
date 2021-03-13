const fs = require('fs');

const errorPage = fs.readFileSync(`${__dirname}/../client/error.html`);
const homePage = fs.readFileSync(`${__dirname}/../client/home-page.html`);
const createPage = fs.readFileSync(`${__dirname}/../client/create-team.html`);
const randomPage = fs.readFileSync(`${__dirname}/../client/random-team.html`);
const editPage = fs.readFileSync(`${__dirname}/../client/view-edit-team.html`);
const adminPage = fs.readFileSync(`${__dirname}/../client/admin.html`);

// serves up an HTML response
const getHtmlResponse = (request, response, page, code) => {
  response.writeHead(code, { 'Content-Type': 'text/html; charset=utf-8' });
  response.write(page);
  response.end();
};

// serves up the 404 page
const get404Response = (request, response) => {
  getHtmlResponse(request, response, errorPage, 404);
};

// serves up the home page
const getHomeResponse = (request, response) => {
  getHtmlResponse(request, response, homePage, 200);
};

// serves up the create team page
const getCreateResponse = (request, response) => {
  getHtmlResponse(request, response, createPage, 200);
};

// serves up the random team page
const getRandomResponse = (request, response) => {
  getHtmlResponse(request, response, randomPage, 200);
};

// serves up the edit team page
const getEditResponse = (request, response) => {
  getHtmlResponse(request, response, editPage, 200);
};

// serves up the admin page
const getAdminResponse = (request, response) => {
  getHtmlResponse(request, response, adminPage, 200);
};

module.exports = {
  get404Response,
  getHomeResponse,
  getCreateResponse,
  getRandomResponse,
  getEditResponse,
  getAdminResponse,
};
