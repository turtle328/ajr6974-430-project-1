const fs = require('fs');

const pokemonScript = fs.readFileSync(`${__dirname}/../client/pokemon-shared.js`);

const getPokemonScript = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/javascript; charset=utf-8' });
  response.write(pokemonScript);
  response.end();
};

module.exports = {
  getPokemonScript,
};
