import type { ServerResponse } from "node:http";

export const sendJson = (
  res: ServerResponse,
  statusCode: number,
  data: object
): void => {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
};
