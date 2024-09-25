"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const handler_1 = require("./handler");
const server = (0, http_1.createServer)(handler_1.handler);
const port = 5000;
server.listen(port, function () {
    console.log(`Server listening on port ${port}`);
});
