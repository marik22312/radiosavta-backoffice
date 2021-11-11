import React from "react";
import { Row, Col } from "antd";
import { Card } from "../../components/Card/Card";
import { ForgotPasswordForm } from "./components/ForgotPasswordForm";

export const ForgotPasswordPage: React.FC = () => {
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
              <h1>Forgot Password?</h1>
            </Col>
          </Row>
          <ForgotPasswordForm />
        </Card>
      </Col>
    </Row>
  );
};
