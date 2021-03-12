const fs = require('fs');
const path = require('path');

const loadImage = (request, response, imageTpe, relPath) => {
  const file = path.resolve(__dirname, relPath);
  const stream = fs.createReadStream(file);

  response.writeHead(200, { 'Content-Type': imageTpe });

  stream.on('open', () => {
    stream.pipe(response);
  });

  stream.on('error', (streamErr) => {
    response.end(streamErr);
  });
};

const getPikachu = (request, response) => {
  loadImage(request, response, 'image/png', '../client/sleeping-pikachu.png');
};

const getPlaceholder = (request, response) => {
  loadImage(request, response, 'image/jpeg', '../client/team-placeholder.jpg');
};

const getLogo = (request, response) => {
  loadImage(request, response, 'image/png', '../client/pokemon-team-builder.png');
};

module.exports = {
  getPikachu,
  getPlaceholder,
  getLogo,
};
