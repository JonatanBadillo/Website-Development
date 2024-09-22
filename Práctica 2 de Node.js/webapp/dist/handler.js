"use strict";
// import { handler } from './handler';
// import { IncomingMessage, ServerResponse } from "http";
Object.defineProperty(exports, "__esModule", { value: true });
exports.basicHandler = void 0;
const fs_1 = require("fs");
const basicHandler = (req, resp) => {
    resp.write((0, fs_1.readFileSync)("/Users/jonatanbadillo/Desktop/UNIVERSITY/8TH SEMESTER/SITIOS WEB/Práctica 2 de Node.js/webapp/src/static/index.html"));
    resp.end();
};
exports.basicHandler = basicHandler;
