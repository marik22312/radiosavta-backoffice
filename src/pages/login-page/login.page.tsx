import { inject, observer } from "mobx-react";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import IdentityStore from "../../stores/identity.store";

import { Row, Col, Button, Card, Form, Input, Alert } from "antd";

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

@inject("identityStore")
@observer
export class LoginPage extends React.Component<Props, LoginPageState> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isLoading: false,
      error: null,
    };
  }
  public render() {
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
            {this.renderForm()}
          </Card>
        </Col>
      </Row>
    );
  }

  public onFormSubmit = async (values: LoginFormValues) => {
    try {
      this.setState({
        isLoading: true,
      });
      await this.props.identityStore.preformLogin(values);
      this.props.history.push("/");
    } catch (error) {
      this.setState({
        isLoading: false,
        error: error.message,
      });
    }
  };

  private renderForm() {
    return (
      <Form
        onFinish={(fields: any) => this.onFormSubmit(fields)}
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
            loading={this.state.isLoading}
            disabled={this.state.isLoading}
          >
            Submit
          </Button>
        </Form.Item>
        {this.state.error && <Alert type="error" message={this.state.error} />}
        <a href="/forgot-password">Forgot Password?</a>
      </Form>
    );
  }
}
