// Source: https://stackoverflow.com/questions/2219526/how-many-bytes-in-a-javascript-string/29955838
// Refactored to an arrow function by ACJ
const getBinarySize = (string) => Buffer.byteLength(string, 'utf8');

// Source: https://stackoverflow.com/a/679937/7838349
// Refactored into an error function
// Checks if an object is empty
const isEmpty = (obj) => Object.keys(obj).length === 0;

// Serves up either a JSON or XML response that includes content
const respond = (request, response, content, acceptedTypes) => {
  const type = acceptedTypes.includes('text/xml') ? 'text/xml' : 'application/json';
  response.writeHead(200, { 'Content-Type': type });
  response.write(content);
  response.end();
};

// Serves up either a JSON or XML response that does not include content
// but does include a 'Content-Type' header
const headerResponse = (request, response, content, acceptedTypes) => {
  const type = acceptedTypes.includes('text/xml') ? 'text/xml' : 'application/json';
  response.writeHead(200, {
    'Content-Length': getBinarySize(content),
    'Content-Type': type,
  }).end();
};

// Serves up a JSON response
const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

// Serves up a JSON response with no content
const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

// store teams
const teams = {};

// Takes in a user object and converts it's data into XML and returns it
const userToXml = (user) => {
  let xml = `<username>${user.user}</username>
  <teamName>${user.teamName}</teamName>
  <team>\n`;
  user.team.forEach((pokemon) => {
    xml
      += `<pokemon>
    <name>${pokemon.name}</name>
    <id>${pokemon.id}</id>`;
    pokemon.types.forEach((type) => {
      xml += `<type>${type}</type>`;
    });
    xml += `<sprite>${pokemon.sprite}</sprite>`;
    xml += '\n</pokemon>\n';
  });
  xml += '</team>';

  return xml;
};

// The XML response for the /getTeam?user=x endpoint
const pokeObjToXml = (obj) => {
  let xml = `<success>${obj.success}</success>
    <message>${obj.message}</message>`;
  if (obj.body !== undefined) {
    xml += '<body>';
    xml += userToXml(obj.body);
    xml += '</body>';
  }
  return xml;
};

// The XML response for the /getTeams endpoint
const teamsToXml = (obj) => {
  if (isEmpty(obj)) {
    return '<message>No users exist</message>';
  }
  let xml = '';
  Object.values(obj).forEach((user) => {
    xml += '<user>';
    xml += userToXml(user);
    xml += '</user>';
  });
  return xml;
};

// This method is for serving up data for the /getTeam endpioint
const getTeam = (request, response, params, acceptedTypes, httpMethod) => {
  const data = {
    success: false,
    message: 'No user found.',
  };

  const user = params.get('user');

  if (teams[user] !== undefined) {
    data.body = teams[user];
    data.success = true;
    data.message = `${user} was found.`;
  }

  let content;
  if (acceptedTypes.includes('text/xml')) {
    content = pokeObjToXml(data);
  } else {
    content = JSON.stringify(data);
  }

  if (httpMethod !== 'HEAD') {
    respond(request, response, content, acceptedTypes);
  } else {
    headerResponse(request, response, content, acceptedTypes);
  }
};

// This method is for serving up data for the /getTeams endpoint
// params is needed cause of url struct, but is not necessary for this method
// eslint-disable-next-line no-unused-vars
const getTeams = (request, response, params, acceptedTypes, httpMethod) => {
  let content;
  if (acceptedTypes.includes('text/xml')) {
    content = teamsToXml(teams);
  } else {
    content = JSON.stringify(teams);
  }
  if (httpMethod !== 'HEAD') {
    respond(request, response, content, acceptedTypes);
  } else {
    headerResponse(request, response, content, acceptedTypes);
  }
};

// This method is for adding data to the server via the /addTeam endpoint
const addTeam = (request, response, data) => {
  const responseJSON = {
    message: 'Missing parameters: Username, Team Name, and at least one Pokemon must be in your team.',
  };

  const team = JSON.parse(data.team);

  if (!data.user || !data.teamName || team.length === 0) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  let responseCode = 201;

  if (teams[data.user]) {
    responseCode = 204;
  } else {
    teams[data.user] = {};
  }

  teams[data.user].user = data.user;
  teams[data.user].teamName = data.teamName;
  teams[data.user].team = team;

  if (responseCode === 201) {
    responseJSON.message = 'New team successfully added!';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  return respondJSONMeta(request, response, responseCode);
};

// This method is for removing users from the user via the /deleteUser endpoint
const deleteUser = (request, response, data) => {
  const responseJSON = {
    message: 'User could not be found.',
  };
  const { user } = data;

  if (teams[user] === undefined) {
    respondJSON(request, response, 400, responseJSON);
  } else {
    delete teams[user];
    respondJSONMeta(request, response, 204);
  }
};

module.exports = {
  addTeam,
  getTeams,
  getTeam,
  deleteUser,
};
