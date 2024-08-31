const { createServer } = require("http");

const server = createServer((request, response) => {
    response.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    const url = new URL(request.url, "http://localhost:8080");
    const body = `<!DOCTYPE html>
<html>

<head>
<meta charset="utf-8">
<title>Node.js Demo</title>
</head>
<body>
<h1 style="color:green">Hello: ${url.searchParams.get("name")}
</h1>
</body>
</html>`;
    response.end(body);
});

// Inicia el servidor y escucha en el puerto 8080
server.listen(8090, () => {
    console.log(
        `Server is listening to http://localhost:${server.address().port}`
    );
});
