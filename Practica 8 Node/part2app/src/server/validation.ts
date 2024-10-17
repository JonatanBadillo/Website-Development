import { NextFunction, Request, Response } from "express";
type ValidatedRequest = Request & {
  validation: {
    results: {
      [key: string]: {
        [key: string]: boolean;
        valid: boolean;
      };
    };
    valid: boolean;
  };
};
export const validate = (propName: string) => {
  const tests: Record<string, (val: string) => boolean> = {};
  const handler = (req: Request, resp: Response, next: NextFunction) => {
    // TODO - perform validation checks
    next();
  };
  handler.required = () => {
    tests.required = (val: string) => val?.trim().length > 0;
    return handler;
  };
  handler.minLength = (min: number) => {
    tests.minLength = (val: string) => val?.trim().length >= min;
    return handler;
  };
  handler.isInteger = () => {
    tests.isInteger = (val: string) => /^[0-9]+$/.test(val);
    return handler;
  };
  return handler;
};
export const getValidationResults = (req: Request) => {
  return (req as ValidatedRequest).validation || { valid: true };
};
