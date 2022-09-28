import React, { useState } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import IdentityStore from "../../stores/identity.store";

import { Row, Col, Button, Card, Form, Input, Alert } from "antd";
import { useLogin } from "../../hooks/auth/useLogin";

interface Props extends RouteComponentProps {
  identityStore: IdentityStore;
}

interface LoginFormValues {
  email: string;
  password: string;
  isLoading: boolean;
}

interface LoginPageState {
  isLoading: boolean;
  error: any;
}

export const LoginPage: React.FC = () => {
  return (
    <Row
      justify="center"
      align="middle"
      style={{
        height: "100%",
      }}
    >
      <Col span={8}>
        <Card>
          <Row>
            <Col span={24}>
              <h1>Login</h1>
            </Col>
          </Row>
          <LoginForm />
        </Card>
      </Col>
    </Row>
  );
};

export const LoginForm = () => {
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const onLoginError = (error: any) => {
    setError(error.response.data.message);
    setIsLoading(false);
    console.error("Login Error:", error.response.data.message);
  };
  const history = useHistory();
  const { preformLogin } = useLogin(onLoginError);

  const onFormSubmit = async (fields: any) => {
    setIsLoading(true);
    setError("");
    const res = await preformLogin(fields);
    if (res) {
      history.push("/");
    }
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
          Submit
        </Button>
      </Form.Item>
      {error && <Alert type="error" message={error} />}
      <a href="/forgot-password">Forgot Password?</a>
    </Form>
  );
};
