import { RoleNames } from "../domain/Users";

export enum PasswordValidationError {
  PASSWORDS_NOT_MATCH = "PASSWORDS_NOT_MATCH",
  PASSWORDS_TOO_SHORT = "PASSWORDS_TOO_SHORT",
  EMPTY_PASSWORD = "EMPTY_PASSWORD",
  UNAUTHORIZED = "UNAUTHORIZED",
  WRONG_PASSWORD = "WRONG_PASSWORD",
  UKNOWN_ERROR = "UKNOWN_ERROR",
}

export const MIN_PASSWORD_LENGTH = 8;

export interface ValidatePasswordResponse {
  password: string;
  error: PasswordValidationError | null;
}

export interface ValidatePasswordObj {
  newPassword: string;
  passwordRepeat: string;
}

export const validatePasswordResetAndTransform = (
  passwordObj: ValidatePasswordObj
): ValidatePasswordResponse => {
  const { newPassword, passwordRepeat } = passwordObj;
  if (!newPassword) {
    return {
      password: newPassword,
      error: PasswordValidationError.EMPTY_PASSWORD,
    };
  }
  if (newPassword.length < MIN_PASSWORD_LENGTH) {
    return {
      password: newPassword,
      error: PasswordValidationError.PASSWORDS_TOO_SHORT,
    };
  }
  if (newPassword !== passwordRepeat) {
    return {
      password: newPassword,
      error: PasswordValidationError.PASSWORDS_NOT_MATCH,
    };
  }
  return {
    password: newPassword,
    error: null,
  };
};

export const isPermitted = (
  roles: RoleNames[],
  requiredRoles?: RoleNames[]
) => {
  if (!requiredRoles) {
    return true;
  }

  return roles.some((role) => requiredRoles.includes(role));
};
