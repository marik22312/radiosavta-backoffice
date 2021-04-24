import { User } from "../domain/Users";
import * as UsersApi from "./Users.api";
import Chance from "chance";
const chance = Chance();

export const createFakeUser = (opts?: Partial<User>): User => {
  return {
    id: opts?.id || chance.integer(),
    name: chance.name(),
    streamer: [],
    is_admin: chance.bool(),
    quote: opts?.quote || chance.word(),
    location: opts?.location || chance.word(),
    profile_image: opts?.profile_image || chance.word(),
    email: opts?.email || chance.email(),
  };
};

export const stubCreateUser = (user?: User) => {
  const createUserSpy = jest
    .spyOn(UsersApi, "createUser")
    .mockResolvedValue({ user: user || createFakeUser() });
  return {
    createUserSpy,
  };
};
export const stubRejectedCreateUser = () => {
  const createUserSpy = jest
    .spyOn(UsersApi, "createUser")
    .mockRejectedValue(new Error("Some error"));
  return {
    createUserSpy,
  };
};
