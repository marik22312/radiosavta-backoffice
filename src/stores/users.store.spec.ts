import Chance from "chance";

import { mockUser } from "../../__tests__/mocks/data.mock";
import { UsersServiceMock } from "../../__tests__/mocks/services/base.service.mock";
import UsersStore from "./users.store";
import { CreateUserRequest } from "../services/users.service";

describe("Users Store", () => {
  const chance = Chance();

  describe("User", () => {
    it("Should be a user", async () => {
      const user = mockUser();
      let externalPromise: any;

      const usersServiceMock = UsersServiceMock();
      usersServiceMock.getAllUsers.mockImplementation(
        () =>
          new Promise((res) => {
            externalPromise = res;
          })
      );

      const usersStore = new UsersStore(usersServiceMock);

      expect(usersStore.isLoading).toBe(false);

      const response = usersStore.fetchAllUsers();

      expect(usersStore.isLoading).toBe(true);

      externalPromise([user]);

      expect(usersServiceMock.getAllUsers).toBeCalledTimes(1);
      expect(await response).toStrictEqual([user]);
      expect(usersStore.isLoading).toBe(false);
    });
  });

  it("Should create new user happy flow", async () => {
    const user: CreateUserRequest = {
      fullname: chance.name(),
      password: chance.hash(),
      profile_picture: chance.url(),
      email: chance.email(),
      location: chance.address(),
      showOnWebsite: ["on"],
    };
    const usersServiceMock = UsersServiceMock();
    usersServiceMock.createUser.mockResolvedValue({
      id: chance.guid(),
    });

    const usersStore = new UsersStore(usersServiceMock);

    await usersStore.createUser(user);
    expect(usersServiceMock.createUser).toBeCalledWith(user);
  });
});
