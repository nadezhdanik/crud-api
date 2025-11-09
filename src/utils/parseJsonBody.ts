import type { IncomingMessage } from "node:http";
import type { UserBody } from "../models/userBody.js";
import { buffer } from "node:stream/consumers";
import { Messages } from "../constants/messages.js";

const isUserBody = (obj: unknown): obj is UserBody => {
  if (typeof obj !== "object" || obj === null) return false;

  if ("username" in obj && "age" in obj && "hobbies" in obj) {
    const username = obj.username;
    const age = obj.age;
    const hobbies = obj.hobbies;

    return (
      typeof username === "string" &&
      typeof age === "number" &&
      Array.isArray(hobbies) &&
      hobbies.every((h) => typeof h === "string")
    );
  }

  return false;
};

export const parseJsonBody = async (
  req: IncomingMessage
): Promise<UserBody> => {
  const buf = await buffer(req);
  const parsed: unknown = JSON.parse(buf.toString() || "{}");

  if (!isUserBody(parsed)) {
    throw new Error(Messages.MISSING_USERDATA);
  }

  return parsed;
};
