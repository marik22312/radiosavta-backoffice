import React from "react";
import { render, waitFor } from "@testing-library/react";
import { CreateUserForm, CreateUserFormProps } from "./CreateUserForm";
import { CreateUserFormDriver } from "./CreateUserForm.driver";
import { act } from "react-dom/test-utils";
import { createFakeUser } from "../../../../../api/Users.api.mock";
import {
  stubUseCreateUser,
  stubUseCreateUserError,
  stubUseCreateUserSuccess,
} from "../hooks/useCreateUser.mock";
import { Chance } from "chance";

const chance = Chance();
describe("CreateUserForm", () => {
  const renderForm = (props?: Partial<CreateUserFormProps>) => {
    const defaultProps: CreateUserFormProps = {
      onError: jest.fn(),
      onUserCreated: jest.fn(),
    };
    const container = render(<CreateUserForm {...defaultProps} {...props} />);
    return new CreateUserFormDriver(container);
  };

  beforeEach(() => {
    stubUseCreateUser();
  });

  describe("Happy Flow", () => {
    it("Should create user correctly when all fields are good", async () => {
      const file = new File([], "chucknorris.png", {
        type: "image/png",
      });

      const createUser = jest.fn();
      stubUseCreateUser({ createUser });
      const driver = renderForm();
      const email = chance.email();
      const name = chance.name();
      const location = chance.address();
      const streamerUsername = chance.word();

      act(() => {
        driver.nameInput.setValue(name);
        driver.emailInput.setValue(email);
        driver.locationInput.setValue(location);
        driver.streamerUsername.setValue(streamerUsername);
      });
      await driver.imageInput.selectFile(file);
      act(() => {
        driver.submitButton.click();
      });
      await waitFor(() => createUser.mock.calls.length > 0);

      expect(createUser).toBeCalledWith({
        email,
        location,
        streamerUsername,
        name,
        profile_picture: expect.any(File),
      });
    });

    it.todo("Should call createUser correctly when turning on visible on site");
    it("Should call onUserCreated correctly after creating user", async () => {
      const fakeUser = createFakeUser();
      const onUserCreated = jest.fn();
      stubUseCreateUserSuccess(fakeUser);
      renderForm({ onUserCreated });

      expect(onUserCreated).toBeCalledWith(fakeUser);
    });
  });

  describe("Sad Flow", () => {
    it.todo("Should not allow creating user without picture");
    it.todo("Should not allow creating user without name");
    it.todo("Should not allow creating user without email");
    it.todo("Should not allow creating user without location");
    it.todo("Should not allow creating user without streamer username");
    it("Should fire onError when error from api", () => {
      const onError = jest.fn();
      const error = new Error("SomeError");
      stubUseCreateUserError(error);
      renderForm({ onError });
      expect(onError).toBeCalledWith(error);
    });
  });
});
