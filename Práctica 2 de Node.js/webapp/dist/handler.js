"use strict";
// import { handler } from './handler';
// import { IncomingMessage, ServerResponse } from "http";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
//import { readFile } from "fs";
const promises_1 = require("fs/promises");
const handler = (req, res) => {
    const p = (0, promises_1.readFile)("data.json");
    p.then((data) => res.end(data, () => console.log("File sent")));
    p.catch((err) => {
        console.log(`Error: ${err.message}`);
        res.statusCode = 500;
        res.end();
    });
};
exports.handler = handler;
