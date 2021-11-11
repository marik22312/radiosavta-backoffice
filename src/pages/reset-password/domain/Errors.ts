export enum ResetPasswordErrorTypes {
  PASSWORD_TOO_WEAK = "PASSWORD_TOO_WEAK",
  PASSWORD_NOT_SAME = "PASSWORD_NOT_SAME",
  GENERIC_ERROR = "GENERIC_ERROR",
}

export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MIN_LOWERCASE = 1;
export const PASSWORD_MIN_UPPERCASE = 1;
export const PASSWORD_MIN_NUMBERS = 1;
