"use strict";
// import { NextFunction, Request, Response } from "express";
// type ValidatedRequest = Request & {
//   validation: {
//     results: {
//       [key: string]: {
//         [key: string]: boolean;
//         valid: boolean;
//       };
//     };
//     valid: boolean;
//   };
// };
// export const validate = (propName: string) => {
//   const tests: Record<string, (val: string) => boolean> = {};
//   const handler = (req: Request, resp: Response, next: NextFunction) => {
//     const vreq = req as ValidatedRequest;
//     if (!vreq.validation) {
//       vreq.validation = { results: {}, valid: true };
//     }
//     vreq.validation.results[propName] = { valid: true };
//     Object.keys(tests).forEach((k) => {
//       let valid = (vreq.validation.results[propName][k] = tests[k](
//         req.body?.[propName]
//       ));
//       if (!valid) {
//         vreq.validation.results[propName].valid = false;
//         vreq.validation.valid = false;
//       }
//     });
//     next();
//   };
//   handler.required = () => {
//     tests.required = (val: string) => val?.trim().length > 0;
//     return handler;
//   };
//   handler.minLength = (min: number) => {
//     tests.minLength = (val: string) => val?.trim().length >= min;
//     return handler;
//   };
//   handler.isInteger = () => {
//     tests.isInteger = (val: string) => /^[0-9]+$/.test(val);
//     return handler;
//   };
//   return handler;
// };
// export const getValidationResults = (req: Request) => {
//   return (req as ValidatedRequest).validation || { valid: true };
// };
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValidationResults = exports.validate = void 0;
const validator_1 = __importDefault(require("validator"));
const validate = (propName) => {
    const tests = {};
    const handler = (req, resp, next) => {
        const vreq = req;
        if (!vreq.validation) {
            vreq.validation = { results: {}, valid: true };
        }
        vreq.validation.results[propName] = { valid: true };
        Object.keys(tests).forEach((k) => {
            let valid = (vreq.validation.results[propName][k] = tests[k](req.body?.[propName]));
            if (!valid) {
                vreq.validation.results[propName].valid = false;
                vreq.validation.valid = false;
            }
        });
        next();
    };
    handler.required = () => {
        tests.required = (val) => !validator_1.default.isEmpty(val, { ignore_whitespace: true });
        return handler;
    };
    handler.minLength = (min) => {
        tests.minLength = (val) => validator_1.default.isLength(val, { min });
        return handler;
    };
    handler.isInteger = () => {
        tests.isInteger = (val) => validator_1.default.isInt(val);
        return handler;
    };
    return handler;
};
exports.validate = validate;
const getValidationResults = (req) => {
    return req.validation || { valid: true };
};
exports.getValidationResults = getValidationResults;
