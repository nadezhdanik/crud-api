import type { IncomingMessage, ServerResponse } from "node:http";
import { StatusCodes } from "../constants/statusCodes.ts";
import type { UserBody } from "../models/userBody.ts";
import { users } from "../store/userStore.ts";
import { parseJsonBody } from "../utils/parseJsonBody.ts";
import { sendJson } from "../utils/sendJson.ts";
import { Methods } from "../constants/methods.ts";
import { v4 as uuidv4 } from "uuid";

export const createUserHandler = async (
  request: IncomingMessage,
  response: ServerResponse
): Promise<boolean> => {
  if (request.method !== Methods.POST) return false;

  const body: UserBody = await parseJsonBody(request);
  const newUser = { id: uuidv4(), ...body };
  users.push(newUser);
  sendJson(response, StatusCodes.CREATED, newUser);

  return true;
};
