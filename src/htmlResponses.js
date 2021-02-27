const fs = require('fs');

const errorPage = fs.readFileSync(`${__dirname}/../client/error.html`);
const clientPage = fs.readFileSync(`${__dirname}/../client/joke-client.html`);
const homePage = fs.readFileSync(`${__dirname}/../client/home-page.html`);
const createPage = fs.readFileSync(`${__dirname}/../client/create-team.html`);
const randomPage = fs.readFileSync(`${__dirname}/../client/random-team.html`);
const editPage = fs.readFileSync(`${__dirname}/../client/view-edit-team.html`);
const adminPage = fs.readFileSync(`${__dirname}/../client/admin.html`);

const getHtmlResponse = (request, response, page, code) => {
  response.writeHead(code, { 'Content-Type': 'text/html; charset=utf-8' });
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

const getCreateResponse = (request, response) => {
  getHtmlResponse(request, response, createPage, 200);
};

const getRandomResponse = (request, response) => {
  getHtmlResponse(request, response, randomPage, 200);
};

const getEditResponse = (request, response) => {
  getHtmlResponse(request, response, editPage, 200);
};

const getAdminResponse = (request, response) => {
  getHtmlResponse(request, response, adminPage, 200);
};

module.exports = {
  get404Response,
  getClientResponse,
  getHomeResponse,
  getCreateResponse,
  getRandomResponse,
  getEditResponse,
  getAdminResponse,
};
