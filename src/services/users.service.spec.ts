import { UsersService, CreateUserRequest } from "./users.service";

import Chance from "chance";

const chance = new Chance();

const apiServiceMock = () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
});

describe("Users Service Tests", () => {
  let apiService: any;
  beforeEach(() => {
    apiService = apiServiceMock();
  });
  it("Should call base api service correctly when updating user", async () => {
    const userId = chance.integer();
    apiService.put.mockResolvedValue({
      data: {
        id: userId,
      },
    });
    const usersService = new UsersService(apiService);

    const user = await usersService.updateUserById(userId, {});

    expect(apiService.put).toBeCalledWith(`/users/${userId}`, {});
    expect(user.id).toBe(userId);
  });

  it("Should call base api service correctly when disabling user", async () => {
    const userId = chance.integer();
    apiService.delete.mockResolvedValue({
      data: {
        id: userId,
      },
    });
    const usersService = new UsersService(apiService);

    const user = await usersService.disableUser(userId);

    expect(apiService.delete).toBeCalledWith(`/users/${userId}`);
    expect(user.id).toBe(userId);
  });

  it("Should call base api service correctly when creating user", async () => {
    const userId = chance.integer();

    const user: CreateUserRequest = {
      fullname: chance.name(),
      password: chance.hash(),
      profile_picture: chance.url(),
      email: chance.email(),
      location: chance.address(),
    };
    const form = new FormData();
    form.append("email", user.email);
    form.append("name", user.fullname);
    form.append("location", user.location);
    form.append("password", user.password);
    form.append("profile_picture", user.profile_picture);

    apiService.post.mockResolvedValue({
      data: {
        id: userId,
      },
    });
    const usersService = new UsersService(apiService);

    await usersService.createUser(user);

    expect(apiService.post).toBeCalledWith(`/admin/users/`, form, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  });
  it('Should call base api service correctly when creating user when showOnWebsite: ["on"],', async () => {
    const userId = chance.integer();

    const user: CreateUserRequest = {
      fullname: chance.name(),
      password: chance.hash(),
      profile_picture: chance.url(),
      email: chance.email(),
      location: chance.address(),
      showOnWebsite: ["on"],
    };
    const form = new FormData();
    form.append("email", user.email);
    form.append("name", user.fullname);
    form.append("location", user.location);
    form.append("password", user.password);
    form.append("profile_picture", user.profile_picture);
    form.append("showOnWebsite", "true");

    apiService.post.mockResolvedValue({
      data: {
        id: userId,
      },
    });
    const usersService = new UsersService(apiService);

    await usersService.createUser(user);

    expect(apiService.post).toBeCalledWith(`/admin/users/`, form, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  });
});
