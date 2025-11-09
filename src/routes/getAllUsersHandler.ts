import type { IncomingMessage, ServerResponse } from "node:http";
import { getAllUsers } from "../store/userStore.ts";
import { sendJson } from "../utils/sendJSON.ts";
import { Methods } from "../constants/methods.ts";
import { Endpoints } from "../constants/endpoints.ts";
import { StatusCodes } from "../constants/statusCodes.ts";

export const getAllUsersHandler = (
  request: IncomingMessage,
  response: ServerResponse
): boolean => {
  if (request.method !== Methods.GET || request.url !== Endpoints.USERS)
    return false;

  const users = getAllUsers();
  sendJson(response, StatusCodes.OK, users);

  return true;
};
