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

const getRandomJokeJSON = () => {
  // pick a random index
  const randJoke = jokes[Math.floor(Math.random() * jokes.length)];
  return JSON.stringify(randJoke);
};

const getRandomJokes = (pLimit = 1) => {
  let limit = pLimit || 1;
  limit = Math.floor(Math.abs(limit));
  limit = limit <= jokes.length ? limit : jokes.length;
  shuffle(jokes);
  const randomJokes = [];
  for (let i = 0; i < limit; i += 1) {
    randomJokes.push(jokes[i]);
  }
  return JSON.stringify(randomJokes);
};

const getRandomJokeResponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.write(getRandomJokeJSON());
  response.end();
};

const getRandomJokesResponse = (request, response, params) => {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.write(getRandomJokes(params.get('limit')));
  response.end();
};

module.exports = {
  getRandomJokeResponse,
  getRandomJokesResponse,
};
