const http = require('http');

const htmlHandler = require('./htmlResponses.js');
const cssHandler = require('./cssResponses.js');
const jsHandler = require('./jsResponses.js');
const jsonHandler = require('./responses.js');
const mediaHandler = require('./mediaResponses.js');
const postHandler = require('./postHandler.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getHomeResponse,
  '/create-team': htmlHandler.getCreateResponse,
  '/random-team': htmlHandler.getRandomResponse,
  '/edit-team': htmlHandler.getEditResponse,
  '/admin': htmlHandler.getAdminResponse,
  '/default-styles.css': cssHandler.getDefaultStyleResponse,
  '/pokemon-shared.js': jsHandler.getPokemonScript,
  '/pokemon-team-builder.png': mediaHandler.getLogo,
  '/sleeping-pikachu.png': mediaHandler.getPikachu,
  '/team-placeholder.jpg': mediaHandler.getPlaceholder,
  '/addTeam': postHandler.addTeam,
  '/deleteUser': postHandler.deleteUser,
  '/getTeams': jsonHandler.getTeams,
  '/getTeam': jsonHandler.getTeam,
  notFound: htmlHandler.get404Response,
};

// uses the url struct to serve up a page of a specified path name
// also passes search params and other info to the handlers
const onRequest = (request, response) => {
  const baseUrl = `http://${request.headers.host}/`;
  const parsedUrl = new URL(request.url, baseUrl);
  const { pathname, searchParams } = parsedUrl;
  let acceptedTypes = request.headers.accept && request.headers.accept.split(',');
  acceptedTypes = acceptedTypes || [];

  console.log(pathname);

  if (urlStruct[pathname]) {
    console.log(urlStruct[pathname]);
    urlStruct[pathname](request, response, searchParams, acceptedTypes, request.method);
  } else {
    urlStruct.notFound(request, response);
  }
};

// 7 - create the server, hook up the request handling function, and start listening on `port`
http.createServer(onRequest).listen(port);
