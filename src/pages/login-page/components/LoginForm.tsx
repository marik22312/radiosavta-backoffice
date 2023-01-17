import React, { useState } from "react";
import { Form, Input, Button, Alert } from "antd";

export const LoginForm: React.FC = (props) => {
  const [isPasswordLogin, setIsPasswordLogin] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const onShowPasswordField = (e: any) => {
    e.preventDefault();
    setIsPasswordLogin((prevState) => !prevState);
  };

  const onFormSubmit = (fields: { email: string; password?: string }) => {
    if (isPasswordLogin) {
      console.log("Email login", fields);
      return;
    }

    console.log("Magic login", fields);
  };

  return (
    <Form
      onFinish={(fields: any) => onFormSubmit(fields)}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
    >
      <Form.Item
        labelAlign="left"
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Name is required!",
          },
          {
            type: "email",
            message: "Invalid email!",
          },
        ]}
      >
        <Input type="email" />
      </Form.Item>
      {isPasswordLogin ? (
        <>
          <Form.Item
            name="password"
            labelAlign="left"
            label="password"
            rules={[
              {
                required: true,
                message: "Please type a password",
              },
            ]}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item>
            <Button
              type={"primary"}
              htmlType="submit"
              loading={isLoading}
              disabled={isLoading}
            >
              Login
            </Button>
          </Form.Item>
        </>
      ) : null}
      {!isPasswordLogin ? (
        <>
          <Form.Item>
            <Button
              type={"primary"}
              htmlType="submit"
              loading={isLoading}
              disabled={isLoading}
            >
              Passwordless login
            </Button>
            <Button
              type={"link"}
              loading={isLoading}
              disabled={isLoading}
              onClick={onShowPasswordField}
            >
              Continue With Email
            </Button>
          </Form.Item>
        </>
      ) : null}

      {error && <Alert type="error" message={error} />}
      <a href="/forgot-password">Forgot Password?</a>
    </Form>
  );
};
