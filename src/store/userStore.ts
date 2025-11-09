import type { User } from "../models/user.ts";

export const users: User[] = [];

export const getAllUsers = (): User[] => {
  return users;
};
