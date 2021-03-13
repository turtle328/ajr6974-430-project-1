const fs = require('fs');

const pokemonScript = fs.readFileSync(`${__dirname}/../client/js/pokemon-shared.js`);

// serves up the shared pokemon script between HTML files
const getPokemonScript = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/javascript; charset=utf-8' });
  response.write(pokemonScript);
  response.end();
};

module.exports = {
  getPokemonScript,
};
