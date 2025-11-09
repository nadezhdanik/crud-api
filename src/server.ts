import { createServer } from "node:http";

export const createAppServer = (port: number) => {
  const server = createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Server is running" }));

    server.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  });

  return server;
};
