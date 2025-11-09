import { createServer } from "node:http";
import type { Server } from "node:http";

export const createAppServer = (port: number): Server => {
  const server = createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Server is running" }));
  });

  server.listen(port, () => {
    console.log(`Server running at http://localhost:${port.toString()}`);
  });

  return server;
};
