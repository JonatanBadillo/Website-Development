"use strict";
// import { handler } from './handler';
// import { IncomingMessage, ServerResponse } from "http";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultHandler = exports.newUrlHandler = exports.notFoundHandler = exports.redirectionHandler = exports.isHttps = void 0;
const tls_1 = require("tls");
const url_1 = require("url");
const isHttps = (req) => {
    return req.socket instanceof tls_1.TLSSocket && req.socket.encrypted;
};
exports.isHttps = isHttps;
const redirectionHandler = (req, resp) => {
    resp.writeHead(302, {
        "Location": "https://localhost:5500"
    });
    resp.end();
};
exports.redirectionHandler = redirectionHandler;
const notFoundHandler = (req, resp) => {
    resp.writeHead(404, "Not Found");
    resp.end();
};
exports.notFoundHandler = notFoundHandler;
const newUrlHandler = (req, resp) => {
    resp.writeHead(200, "OK");
    resp.write("Hello, New URL");
    resp.end();
};
exports.newUrlHandler = newUrlHandler;
const defaultHandler = (req, resp) => {
    resp.writeHead(200, "OK");
    const protocol = (0, exports.isHttps)(req) ? "https" : "http";
    const parsedURL = new url_1.URL(req.url ?? "", `${protocol}://${req.headers.host}`);
    if (!parsedURL.searchParams.has("keyword")) {
        resp.write(`Hello, ${protocol.toUpperCase()}`);
    }
    else {
        resp.write(`Hello, ${parsedURL.searchParams.get("keyword")}`);
    }
    resp.end();
};
exports.defaultHandler = defaultHandler;
