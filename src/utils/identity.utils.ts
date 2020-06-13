export enum PasswordValidationError {
  PASSWORDS_NOT_MATCH = "PASSWORDS_NOT_MATCH",
  PASSWORDS_TOO_SHORT = "PASSWORDS_TOO_SHORT",
  EMPTY_PASSWORD = "EMPTY_PASSWORD"
}

export const MIN_PASSWORD_LENGTH: number = 8;

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
      error: PasswordValidationError.EMPTY_PASSWORD
    }
  } else if (newPassword.length < MIN_PASSWORD_LENGTH) {
    return {
      password: newPassword,
      error: PasswordValidationError.PASSWORDS_TOO_SHORT
    }
  } else if (newPassword !== passwordRepeat) {
    return {
      password: newPassword,
      error: PasswordValidationError.PASSWORDS_NOT_MATCH
    }
  }
  return {
    password: newPassword,
    error: null
  }
};
