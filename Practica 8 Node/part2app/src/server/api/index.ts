import { Express } from "express";
import repository from "../data";
export const createApi = (app: Express) => {
  app.get("/api/results", async (req, resp) => {
    if (req.query.name) {
      const data = await repository.getResultsByName(
        req.query.name.toString(),
        10
      );
      if (data.length > 0) {
        resp.json(data);
      } else {
        resp.writeHead(404);
      }
    } else {
      resp.json(await repository.getAllResults(10));
    }
    resp.end();
  });
};
