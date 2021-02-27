const fs = require('fs');
const path = require('path');

const loadPng = (request, response, relPath) => {
  const file = path.resolve(__dirname, relPath);
  const stream = fs.createReadStream(file);

  response.writeHead(200, { 'Content-Type': 'image/png' });

  stream.on('open', () => {
    stream.pipe(response);
  });

  stream.on('error', (streamErr) => {
    response.end(streamErr);
  });
};

const getPikachu = (request, response) => {
  loadPng(request, response, '../client/sleeping-pikachu.png');
};

module.exports = {
  getPikachu,
};
