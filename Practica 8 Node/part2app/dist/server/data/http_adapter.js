"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAdapter = void 0;
function createAdapter(app, ws, baseUrl) {
    app.get(baseUrl, async (req, resp) => {
        try {
            resp.json(await ws.getMany(req.query));
            resp.end();
        }
        catch (err) {
            writeErrorResponse(err, resp);
        }
    });
    app.get(`${baseUrl}/:id`, async (req, resp) => {
        try {
            const data = await ws.getOne(req.params.id);
            if (data == undefined) {
                resp.writeHead(404);
            }
            else {
                resp.json(data);
            }
            resp.end();
        }
        catch (err) {
            writeErrorResponse(err, resp);
        }
    });
    app.post(baseUrl, async (req, resp) => {
        try {
            const data = await ws.store(req.body);
            resp.json(data);
            resp.end();
        }
        catch (err) {
            writeErrorResponse(err, resp);
        }
    });
    app.delete(`${baseUrl}/:id`, async (req, resp) => {
        try {
            resp.json(await ws.delete(req.params.id));
            resp.end();
        }
        catch (err) {
            writeErrorResponse(err, resp);
        }
    });
    const writeErrorResponse = (err, resp) => {
        console.error(err);
        resp.writeHead(500);
        resp.end();
    };
}
exports.createAdapter = createAdapter;
