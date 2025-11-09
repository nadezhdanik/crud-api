import type { IncomingMessage, ServerResponse } from "node:http";
import { StatusCodes } from "../constants/statusCodes.ts";
import { Methods } from "../constants/methods.ts";
import { users } from "../store/userStore.ts";
import { parseJsonBody } from "../utils/parseJsonBody.ts";
import { sendJson } from "../utils/sendJson.ts";
import type { UserBody } from "../models/userBody.ts";
import { Messages } from "../constants/messages.ts";
import { extractUserId } from "../utils/extractUserId.ts";
import { validateUserId } from "../utils/validateUserId.ts";
import { findUserIndex } from "../utils/findUserIndex.ts";

export const putUserHandler = async (
  request: IncomingMessage,
  response: ServerResponse
): Promise<boolean> => {
  if (request.method !== Methods.PUT) return false;

  const userId = extractUserId(request.url);
  if (!userId) return false;
  if (!validateUserId(userId, response)) return true;

  let body: UserBody;
  try {
    body = await parseJsonBody(request);
  } catch {
    sendJson(response, StatusCodes.BAD_REQUEST, {
      message: Messages.INVALID_JSON,
    });
    return true;
  }

  const index = findUserIndex(userId, response);
  if (index === -1) return true;

  users[index] = { ...users[index], ...body, id: userId };
  sendJson(response, StatusCodes.OK, users[index]);
  return true;
};
