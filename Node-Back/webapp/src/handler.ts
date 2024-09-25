import { IncomingMessage, ServerResponse } from "http";
export const handler = (req: IncomingMessage, res: ServerResponse) => {
res.end("Hello World");
};