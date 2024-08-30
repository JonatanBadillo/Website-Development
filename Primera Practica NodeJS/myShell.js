const { createServer } = require("http");

// Crear el servidor HTTP
const server = createServer((request, response) => {
  response.writeHead(200, { "content-type": "text/plain; charset=utf-8" });
  response.write("Hello ");
  response.end(" World\n");
});

// Escuchar en el puerto 8080
server.listen(8080, () => {
  console.log(
    `Server is listening to\n\nhttp://localhost:${server.address().port}`
  );
});
