import { createServer } from "http";
import { handler } from "./handler";

const server = createServer(handler);
const port = 5000;
server.listen(port, function () {
  console.log(`Server listening on port ${port}`);
});
