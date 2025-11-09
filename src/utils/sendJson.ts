import type { ServerResponse } from "node:http";
import { Headers } from "../constants/headers.ts";

export const sendJson = (
  res: ServerResponse,
  statusCode: number,
  data: object
): void => {
  res.writeHead(statusCode, Headers.JSON);
  res.end(JSON.stringify(data));
};
