import { createServer } from "node:http";
import type { Server } from "node:http";
import { handleUserRoutes } from "./routes/index.ts";

export const createAppServer = (port: number): Server => {
  const server = createServer((req, res) => {
    if (!handleUserRoutes(req, res)) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Route not found" }));
    }
  });

  server.listen(port, () => {
    console.log(`Server running at http://localhost:${port.toString()}`);
  });

  return server;
};
