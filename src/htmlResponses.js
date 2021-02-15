const errorPage = `
<html>
  <head>
    <title>404 - File Not Found</title>
  </head>
  <body>
    <h1>404 - File not Found!</h1>
    <p>Check your URL, or your typing.</p>
    <p>:-(</p>
  </body>
</html>`;

const get404Response = (request, response) => {
  response.writeHead(404, { 'Content-Type': 'text/html' });
  response.write(errorPage);
  response.end();
};

module.exports.get404Response = get404Response;
