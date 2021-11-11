import React from "react";
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_MIN_LOWERCASE,
  PASSWORD_MIN_NUMBERS,
  PASSWORD_MIN_UPPERCASE,
  ResetPasswordErrorTypes,
} from "../domain/Errors";

export const FormErrors: React.FC<{ type: ResetPasswordErrorTypes }> = (
  props: any
) => {
  if (props.type === ResetPasswordErrorTypes.PASSWORD_NOT_SAME) {
    return <>Passwords do not match</>;
  }
  if (props.type === ResetPasswordErrorTypes.GENERIC_ERROR) {
    return <>Something went wrong, Please contact support</>;
  }
  return (
    <div>
      <ul>
        <li>Password must be at least {PASSWORD_MIN_LENGTH} characters long</li>
        <li>
          Password must have atleast {PASSWORD_MIN_LOWERCASE} lowercase letter
        </li>
        <li>
          Password must have atleast {PASSWORD_MIN_UPPERCASE} uppercase letter
        </li>
        <li>Password must have atleast {PASSWORD_MIN_NUMBERS} number</li>
      </ul>
    </div>
  );
};
