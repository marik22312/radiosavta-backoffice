import { act, renderHook } from "@testing-library/react-hooks";
import { Chance } from "chance";
import { CreateUserRequest } from "../../../../../api/Users.api";
import {
  createFakeUser,
  stubCreateUser,
  stubRejectedCreateUser,
} from "../../../../../api/Users.api.mock";
import { useCreateUser, UseCreateUserArgs } from "./useCreateUser";

const chance = Chance();
describe("useCreateUser", () => {
  const renderUseCreateUser = (args?: UseCreateUserArgs) => {
    return renderHook(() => useCreateUser(args));
  };
  beforeEach(() => {
    stubCreateUser();
  });

  it("Should call createUser api correctly", async () => {
    const user = createFakeUser();
    const fakeRequest: CreateUserRequest = {
      name: user.name,
      streamerUsername: chance.word(),
      profile_picture: new File([], chance.word()),
      email: user.email,
      location: user.location,
      showOnWebsite: chance.bool(),
    };
    const { createUserSpy } = stubCreateUser(user);

    const { result } = renderUseCreateUser();

    await act(async () => {
      await result.current.createUser(fakeRequest);
    });

    expect(createUserSpy).toBeCalledWith(fakeRequest);
  });

  it("Should call onSuccess after creating user", async () => {
    const user = createFakeUser();
    const fakeRequest: CreateUserRequest = {
      name: user.name,
      streamerUsername: chance.word(),
      profile_picture: new File([], chance.word()),
      email: user.email,
      location: user.location,
      showOnWebsite: chance.bool(),
    };
    const onSuccess = jest.fn();
    stubCreateUser(user);

    const { result } = renderUseCreateUser({ onSuccess });

    await act(async () => {
      await result.current.createUser(fakeRequest);
    });

    expect(onSuccess).toBeCalledWith({ user });
  });

  it("Should call onError after request rejected", async () => {
    const fakeRequest: CreateUserRequest = {
      name: chance.name(),
      streamerUsername: chance.word(),
      profile_picture: new File([], chance.word()),
      email: chance.email(),
      location: chance.word(),
      showOnWebsite: chance.bool(),
    };
    const onError = jest.fn();
    stubRejectedCreateUser();

    const { result } = renderUseCreateUser({ onError });

    await act(async () => {
      await result.current.createUser(fakeRequest);
    });

    expect(onError).toBeCalled();
  });
});
