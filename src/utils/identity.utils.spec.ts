import Chance from "chance";

import {
  PasswordValidationError,
  ValidatePasswordObj,
  validatePasswordResetAndTransform,
} from "./identity.utils";

const chance = Chance();

describe("Identity utils", () => {
  it("Should return PASSWORDS_NOT_MATCH when new password and password repeat not match", () => {
    const password = chance.string({ length: 10 });
    const passwordObj: ValidatePasswordObj = {
      passwordRepeat: "",
      newPassword: password,
    };

    const response = validatePasswordResetAndTransform(passwordObj);

    expect(response.error).toBe(PasswordValidationError.PASSWORDS_NOT_MATCH);
  });

  it("Should return PASSWORDS_TOO_SHORT when new password is too short", () => {
    const password = chance.string({ length: 7 });
    const passwordObj: ValidatePasswordObj = {
      passwordRepeat: password,
      newPassword: password,
    };

    const response = validatePasswordResetAndTransform(passwordObj);

    expect(response.error).toBe(PasswordValidationError.PASSWORDS_TOO_SHORT);
  });

  it("Should return EMPTY_PASSWORD if new password is empty", () => {
    const passwordObj: ValidatePasswordObj = {
      passwordRepeat: "",
      newPassword: "",
    };

    const response = validatePasswordResetAndTransform(passwordObj);

    expect(response.error).toBe(PasswordValidationError.EMPTY_PASSWORD);
  });

  it("Should transform password object correctly", () => {
    const newPassword = chance.string({ length: 10 });

    const passwordObj: ValidatePasswordObj = {
      passwordRepeat: newPassword,
      newPassword,
    };

    const response = validatePasswordResetAndTransform(passwordObj);

    expect(response.error).toBe(null);
    expect(response.password).toBe(newPassword);
  });
});
