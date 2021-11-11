import React from "react";
import { Row, Col } from "antd";
import { Card } from "../../components/Card/Card";
import { ResetPasswordForm } from "./components/ResetPasswordForm";
export const ResetPasswordPage: React.FC = () => {
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
              <h1>Reset Password</h1>
            </Col>
          </Row>
          <ResetPasswordForm />
        </Card>
      </Col>
    </Row>
  );
};
