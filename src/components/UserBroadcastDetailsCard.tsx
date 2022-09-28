import { Card, Col, Descriptions, Row, Button } from "antd";
import React from "react";
import {
  RADIO_SERVER_MOUNT,
  RADIO_SERVER_PORT,
  RADIO_SERVER_URL,
} from "../config/constants.config";
import { useLoggedInUser } from "../hooks/auth/useLoggedInUser";

export const UserBroadcastDetailsCard: React.FC = () => {
  const { user } = useLoggedInUser();
  return (
    <Card
      title={"Broadcasting & Streamer Details"}
      extra={
        <a
          href="https://docs.azuracast.com/en/user-guide/streaming-software"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button>Configure Connection</Button>
        </a>
      }
    >
      <Row>
        <Col span={12}>
          <Descriptions title={"Connection information"} layout="vertical">
            <Descriptions.Item
              label="Username"
              labelStyle={{ fontWeight: "bold" }}
            >
              {user?.streamer?.[0].user_name}
            </Descriptions.Item>
            <Descriptions.Item
              label="Display name"
              labelStyle={{ fontWeight: "bold" }}
            >
              {user?.streamer?.[0].display_name}
            </Descriptions.Item>
          </Descriptions>
        </Col>
        <Col span={12}>
          {" "}
          <Descriptions title={"Connection Config"} layout="vertical">
            <Descriptions.Item label="Host" labelStyle={{ fontWeight: "bold" }}>
              {RADIO_SERVER_URL}
            </Descriptions.Item>
            <Descriptions.Item label="Port" labelStyle={{ fontWeight: "bold" }}>
              {RADIO_SERVER_PORT}
            </Descriptions.Item>
            <Descriptions.Item
              label="Mount"
              labelStyle={{ fontWeight: "bold" }}
            >
              {RADIO_SERVER_MOUNT}
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </Card>
  );
};
