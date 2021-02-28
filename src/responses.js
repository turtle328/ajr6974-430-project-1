const jokes = [
  { q: 'What do you call a very small valentine?', a: 'A valen-tiny!' },
  { q: 'What did the dog say when he rubbed his tail on the sandpaper?', a: 'Ruff, Ruff!' },
  { q: 'What did the boy cat say to the girl cat?', a: "You're Purr-fect!" },
  { q: "Why don't sharks like to eat clowns?", a: 'Because they taste funny!' },
  { q: "What is a frog's favorite outdoor sport?", a: 'Fly Fishing!' },
  { q: 'I hate jokes about German sausages.', a: 'Theyre the wurst.' },
  { q: 'Did you hear about the cheese factory that exploded in France?', a: 'There was nothing left but de Brie.' },
  { q: 'Our wedding was so beautiful ', a: 'Even the cake was in tiers.' },
  { q: 'Is this pool safe for diving?', a: 'It deep ends.' },
  { q: 'Dad, can you put my shoes on?', a: 'I dont think theyll fit me.' },
  { q: 'Can February March?', a: 'No, but April May' },
  { q: 'What lies at the bottom of the ocean and twitches?', a: 'A nervous wreck.' },
  { q: 'Im reading a book on the history of glue.', a: 'I just cant seem to put it down.' },
  { q: 'Dad, can you put the cat out?', a: 'I didnt know it was on fire.' },
  { q: 'What did the ocean say to the sailboat?', a: 'Nothing, it just waved.' },
  { q: 'What do you get when you cross a snowman with a vampire?', a: 'Frostbite' },
];

/**
 * Shuffles array in place. ES6 version
 * https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
// https://stackoverflow.com/a/1421988/7838349
function isNumber(n) {
  return !Number.isNaN(parseFloat(n)) && !Number.isNaN(n - 0);
}

// Source: https://stackoverflow.com/questions/2219526/how-many-bytes-in-a-javascript-string/29955838
// Refactored to an arrow function by ACJ
const getBinarySize = (string) => Buffer.byteLength(string, 'utf8');

const getRandomJoke = () => {
  // pick a random index
  const randJoke = jokes[Math.floor(Math.random() * jokes.length)];
  return randJoke;
};

const getRandomJokes = (pLimit = 1) => {
  // is limit a number?
  let limit = isNumber(pLimit) ? pLimit : 1;
  // is limit < 0?
  limit = limit > 0 ? limit : 1;
  // is limit > than size of jokes array?
  limit = limit <= jokes.length ? limit : jokes.length;
  shuffle(jokes);
  const randomJokes = [];
  for (let i = 0; i < limit; i += 1) {
    randomJokes.push(jokes[i]);
  }
  return randomJokes;
};

const respond = (request, response, content, acceptedTypes) => {
  const type = acceptedTypes.includes('text/xml') ? 'text/xml' : 'application/json';
  response.writeHead(200, { 'Content-Type': type });
  response.write(content);
  response.end();
};

const headerResponse = (request, response, content, acceptedTypes) => {
  const type = acceptedTypes.includes('text/xml') ? 'text/xml' : 'application/json';
  response.writeHead(200, {
    'Content-Length': getBinarySize(content),
    'Content-Type': type,
  }).end();
};

// for /random-joke endpoint
const getRandomJokeResponse = (request, response, params, acceptedTypes, httpMethod) => {
  const joke = getRandomJoke();

  let content;
  if (acceptedTypes.includes('text/xml')) {
    content = `
    <joke>
      <q>${joke.q}</q>
      <a>${joke.a}</a>
    </joke>`;
  } else {
    content = JSON.stringify(joke);
  }

  if (httpMethod === 'HEAD') {
    return headerResponse(request, response, content, acceptedTypes);
  }
  return respond(request, response, content, acceptedTypes);
};

// for /random-jokes?limit=x endpoint
const getRandomJokesResponse = (request, response, params, acceptedTypes, httpMethod) => {
  const randJokes = getRandomJokes(params.get('limit'));

  let content;
  if (acceptedTypes.includes('text/xml')) {
    content = '<jokes>';
    for (let i = 0; i < randJokes.length; i += 1) {
      content += `
      <joke>
        <q>${randJokes[i].q}</q>
        <a>${randJokes[i].a}</a>
      </joke>`;
    }
    content += '</jokes>';
  } else {
    content = JSON.stringify(randJokes);
  }

  if (httpMethod === 'HEAD') {
    return headerResponse(request, response, content, acceptedTypes);
  }
  return respond(request, response, content, acceptedTypes);
};

// store teams
const teams = {};

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

const getTeams = (request, response) => {
  const responseJSON = {
    teams,
  };

  respondJSON(request, response, 200, responseJSON);
};

// add team and it's associated data
const addTeam = (request, response, data) => {
  const responseJSON = {
    message: 'Username, Team Name, and at least one Pokemon must be in your team.',
  };

  const team = JSON.parse(data.team);

  console.log(team);

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
    responseJSON.message = 'New team sucessfully added!';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  return respondJSONMeta(request, response, responseCode);
};

module.exports = {
  getRandomJokeResponse,
  getRandomJokesResponse,
  addTeam,
  getTeams,
};
