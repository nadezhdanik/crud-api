import type { ServerResponse } from "http";
import { Messages } from "../constants/messages.ts";
import { StatusCodes } from "../constants/statusCodes.ts";
import { users } from "../store/userStore.ts";
import { sendJson } from "./sendJson.ts";

export const findUserIndex = (
  userId: string,
  response: ServerResponse
): number => {
  const index = users.findIndex((u) => u.id === userId);
  if (index === -1) {
    sendJson(response, StatusCodes.NOT_FOUND, {
      message: Messages.USER_NOT_FOUND,
    });
  }
  return index;
};
