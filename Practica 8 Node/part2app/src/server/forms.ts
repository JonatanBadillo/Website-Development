import express, { Express } from "express";
import multer from "multer";
import { sanitizeValue } from "./sanitize";
const fileMiddleware = multer({ storage: multer.memoryStorage() });
export const registerFormMiddleware = (app: Express) => {
  app.use(express.urlencoded({ extended: true }));
};
export const registerFormRoutes = (app: Express) => {
  app.get("/form", (req, resp) => {
    22;

    for (const key in req.query) {
      resp.write(`${key}: ${req.query[key]}\n`);
    }
    resp.end();
  });
  app.post("/form", fileMiddleware.single("datafile"), (req, resp) => {
    resp.render("formData", {
      ...req.body,
      file: req.file,
      fileData: req.file?.buffer.toString(),
    });
  });
};
