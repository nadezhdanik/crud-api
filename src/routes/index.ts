import type { IncomingMessage, ServerResponse } from "node:http";
import { getAllUsersHandler } from "./getAllUsersHandler.ts";
import { getUserByIdHandler } from "./getUserByIdHandler.ts";
import { createUserHandler } from "./createUserHandler.ts";
import { Endpoints } from "../constants/endpoints.ts";

export const handleUserRoutes = async (
  request: IncomingMessage,
  response: ServerResponse
): Promise<boolean> => {
  const url = request.url ?? "";

  if (!url.startsWith(Endpoints.USERS)) return false;

  if (getAllUsersHandler(request, response)) return true;

  const parts = url.split("/");
  const idPart = parts[3] ?? "";
  const userId = idPart.split("?")[0];
  if (userId) {
    if (getUserByIdHandler(request, response, userId)) return true;
  }

  if (await createUserHandler(request, response)) return true;

  return false;
};
