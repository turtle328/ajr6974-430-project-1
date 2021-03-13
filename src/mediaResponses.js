const fs = require('fs');
const path = require('path');

// serves up either a PNG or JPEG
const loadImage = (request, response, imageType, relPath) => {
  const file = path.resolve(__dirname, relPath);
  const stream = fs.createReadStream(file);

  response.writeHead(200, { 'Content-Type': imageType });

  stream.on('open', () => {
    stream.pipe(response);
  });

  stream.on('error', (streamErr) => {
    response.end(streamErr);
  });
};

// serves up the sleeping pikachu image (used for 404 page)
const getPikachu = (request, response) => {
  loadImage(request, response, 'image/png', '../client/media/sleeping-pikachu.png');
};

// serves up the pokemon placeholder image
const getPlaceholder = (request, response) => {
  loadImage(request, response, 'image/jpeg', '../client/media/team-placeholder.jpg');
};

// serves up the landing page logo
const getLogo = (request, response) => {
  loadImage(request, response, 'image/png', '../client/media/pokemon-team-builder.png');
};

module.exports = {
  getPikachu,
  getPlaceholder,
  getLogo,
};
