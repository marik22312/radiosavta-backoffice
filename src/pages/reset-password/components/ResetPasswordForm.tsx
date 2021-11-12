import { Form, Input, Button, Alert } from "antd";
import { AxiosError } from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import isStrongPassword from "validator/es/lib/isStrongPassword";
import { useQueryParams } from "../../../hooks/useQueryParams";
import { useResetPassword } from "./hooks/useResetPassword";
import ReCAPTCHA from "react-google-recaptcha";
import { RECAPTCHA_CLIENT } from "../../../config/api.config";
import { FormErrors } from "./FormErrors";
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_MIN_LOWERCASE,
  PASSWORD_MIN_NUMBERS,
  PASSWORD_MIN_UPPERCASE,
  ResetPasswordErrorTypes,
} from "../domain/Errors";
import { showErrorToast, showSuccessToast } from "../../../utils/toast.util";

interface ResetPasswordFields {
  password: string;
  passwordRepeat: string;
}
export const ResetPasswordForm: React.FC = () => {
  const [error, setError] = useState<ResetPasswordErrorTypes | null>(null);
  const onError = (err: AxiosError) => {
    if (err.isAxiosError) {
      return setError(ResetPasswordErrorTypes.GENERIC_ERROR);
    }
    setError(ResetPasswordErrorTypes.GENERIC_ERROR);
  };
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const { resetPassword, isLoading } = useResetPassword(onError);
  const search = useQueryParams();
  const history = useHistory();

  if (!search.get("token")) {
    history.push("/");
  }

  const onFormSubmit = async (fields: ResetPasswordFields) => {
    const isStrong = isStrongPassword(fields.password, {
      minLength: PASSWORD_MIN_LENGTH,
      minLowercase: PASSWORD_MIN_LOWERCASE,
      minUppercase: PASSWORD_MIN_UPPERCASE,
      minNumbers: PASSWORD_MIN_NUMBERS,
    });
    const isSame = fields.password === fields.passwordRepeat;

    if (!isStrong) {
      return setError(ResetPasswordErrorTypes.PASSWORD_TOO_WEAK);
    }
    if (!isSame) {
      return setError(ResetPasswordErrorTypes.PASSWORD_NOT_SAME);
    }

    setError(null);
    const res = await resetPassword({
      token: search.get("token")!,
      captchaToken: captchaToken!,
      password: fields.password,
      passwordRepeat: fields.passwordRepeat,
    });
    if (res) {
      onSuccess();
    }
  };

  const onSuccess = () => {
    showSuccessToast("Reset password success!");
    history.push("/login");
  };

  return (
    <Form
      onFinish={(fields: ResetPasswordFields) => onFormSubmit(fields)}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
    >
      <Form.Item
        labelAlign="left"
        label="New Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Required Field",
          },
        ]}
      >
        <Input type="password" />
      </Form.Item>
      <Form.Item
        name="passwordRepeat"
        labelAlign="left"
        label="Repeat Password"
        rules={[
          {
            required: true,
            message: "Please repeat password",
          },
        ]}
      >
        <Input type="password" />
      </Form.Item>
      <Form.Item>
        <ReCAPTCHA
          sitekey={RECAPTCHA_CLIENT}
          onChange={(res) => setCaptchaToken(res)}
          onExpired={() => setCaptchaToken(null)}
        />
      </Form.Item>
      <Form.Item>
        <Button
          type={"primary"}
          htmlType="submit"
          loading={isLoading}
          disabled={isLoading || !captchaToken}
        >
          Submit
        </Button>
      </Form.Item>
      {error && <Alert message={<FormErrors type={error} />} type="error" />}
    </Form>
  );
};
