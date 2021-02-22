const http = require('http');

const htmlHandler = require('./htmlResponses.js');
const cssHandler = require('./cssResponses.js');
const jsonHandler = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/random-joke': jsonHandler.getRandomJokeResponse,
  '/random-jokes': jsonHandler.getRandomJokesResponse,
  '/default-styles.css': cssHandler.getDefaultStyleResponse,
  '/joke-client': htmlHandler.getClientResponse,
  notFound: htmlHandler.get404Response,
};

const onRequest = (request, response) => {
  const baseUrl = `http://${request.headers.host}/`;
  const parsedUrl = new URL(request.url, baseUrl);
  const { pathname, searchParams } = parsedUrl;
  let acceptedTypes = request.headers.accept && request.headers.accept.split(',');
  acceptedTypes = acceptedTypes || [];

  if (urlStruct[pathname]) {
    urlStruct[pathname](request, response, searchParams, acceptedTypes, request.method);
  } else {
    urlStruct.notFound(request, response);
  }
};

// 7 - create the server, hook up the request handling function, and start listening on `port`
http.createServer(onRequest).listen(port);
