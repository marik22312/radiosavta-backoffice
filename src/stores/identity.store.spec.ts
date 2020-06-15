import Chance from "chance";

import { IdentityServiceMock } from "../../__tests__/mocks/services/identity.service.mock";
import { TryLogigArgs } from "../services/identity.service";
import { ValidatePasswordObj } from "../utils/identity.utils";
import IdentityStore, { ResetPasswordObj } from "./identity.store";

describe("Identity Store", () => {
  const chance = Chance();

  let identityService: IdentityServiceMock;
  let identityStore: IdentityStore;
  beforeEach(() => {
    identityService = new IdentityServiceMock();
    identityStore = new IdentityStore(identityService);
  });
  it("Should Preform Login", async () => {
    const token = chance.guid();
    const email = chance.email();
    const password = chance.word();

    identityService.preformLogin.mockReturnValue({
      data: {
        token,
      },
    });
    const credentials: TryLogigArgs = {
      email,
      password,
    };

    await identityStore.preformLogin(credentials);

    expect(identityStore.token).toBe(token);
    expect(identityService.preformLogin).toBeCalledWith(credentials);
    expect(identityService.setTokenToStorage).toBeCalledWith(token);
  });

  it("Should call resetPassword correctly", async () => {
    const newPassword = chance.string({ length: 10 });
    const oldPassword = chance.string({ length: 10 });

    const passwordObj: ResetPasswordObj = {
      passwordRepeat: newPassword,
      newPassword,
      oldPassword,
    };

    identityService.resetPassword.mockReturnValue({
      data: {
        successMessage: "Yay",
      },
    });

    const response = await identityStore.resetPassword(passwordObj);

    expect(identityService.resetPassword).toBeCalledWith({
      currentPassword: oldPassword,
      newPassword,
    });
  });

  it("Should call resetPassword with invalid password", async () => {
    const newPassword = chance.string({ length: 10 });
    const oldPassword = chance.string({ length: 10 });

    const passwordObj: ResetPasswordObj = {
      passwordRepeat: "",
      newPassword,
      oldPassword,
    };

    identityService.resetPassword.mockReturnValue({
      data: {
        successMessage: "Yay",
      },
    });

    const response = await identityStore.resetPassword(passwordObj);

    expect(identityService.resetPassword).not.toBeCalled();
  });
});
