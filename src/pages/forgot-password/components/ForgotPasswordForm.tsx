import { Form, Input, Button, Alert } from "antd";
import React, { useState } from "react";
import { useForgotPassword } from "./hooks/useForgotPassword";
import { RECAPTCHA_CLIENT } from "../../../config/api.config";
import { ResetPasswordErrorTypes } from "../domain/Errors";

import ReCAPTCHA from "react-google-recaptcha";
import { useHistory } from "react-router-dom";
interface ForgotPasswordFields {
  email: string;
}
export const ForgotPasswordForm: React.FC = () => {
  const [error, setError] = useState<string>("");
  const onError = () => {
    setError("Something went wrong, please contact support");
  };
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const { forgotPassword, isLoading } = useForgotPassword(onError);

  const onFormSubmit = async (fields: ForgotPasswordFields) => {
    await forgotPassword({
      captchaToken: captchaToken!,
      email: fields.email,
    });
    setError("");
  };

  return (
    <Form
      onFinish={(fields: ForgotPasswordFields) => onFormSubmit(fields)}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
    >
      <Form.Item
        labelAlign="left"
        label="Email Address"
        name="email"
        rules={[
          {
            required: true,
            message: "Required Field",
          },
          {
            type: "email",
            message: "Please insert valid email",
          },
        ]}
      >
        <Input type="email" />
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
      {error && <Alert message={error} type="error" />}
    </Form>
  );
};
