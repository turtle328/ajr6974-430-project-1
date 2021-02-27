const fs = require('fs');

const cssStyles = fs.readFileSync(`${__dirname}/../client/default-styles.css`);

const getDefaultStyleResponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css; charset=utf-8' });
  response.write(cssStyles);
  response.end();
};

module.exports.getDefaultStyleResponse = getDefaultStyleResponse;
