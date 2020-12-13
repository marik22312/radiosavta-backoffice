import React from "react";
import ReactDOM from "react-dom";
import { useUserById } from "../../hooks/useUserById";
import { createElement } from "react";
import {
  Col,
  Descriptions,
  Divider,
  Drawer,
  Row,
  Space,
  Typography,
} from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { BASE_IMAGES_URL } from "../../config/constants.config";
import { useHistory } from "react-router-dom";

interface UserSidePanelProps {
  userId: number;
  isOpen: boolean;
  onClose: () => void;
}
export const UserSidePanel: React.FC<UserSidePanelProps> = (props) => {
  const { user } = useUserById(props.userId);
  const history = useHistory();
  return (
    <Drawer
      title={user?.name}
      placement="right"
      closable={false}
      onClose={props.onClose}
      visible={props.isOpen}
      width="25%"
    >
      <Row justify="center">
        <Col>
          <Avatar
            size={150}
            src={
              user?.profile_image && `${BASE_IMAGES_URL}/${user?.profile_image}`
            }
          >
            {user?.name}
          </Avatar>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={24}>
          <Typography.Title level={5}>Personal info</Typography.Title>
        </Col>
        <Col>
          <Descriptions layout="vertical">
            <Descriptions.Item label="Email">{user?.email}</Descriptions.Item>
          </Descriptions>
          <Descriptions layout="vertical">
            <Descriptions.Item label="Location">
              {user?.location}
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={24}>
          <Typography.Title level={5}>Participating in</Typography.Title>
        </Col>
        {user?.programs.map((program) => {
          return (
            <Col onClick={() => history.push(`/programs/${program.id}`)}>
              <div>
                <Avatar
                  shape="square"
                  size={100}
                  src={`${BASE_IMAGES_URL}/${program.cover_image}`}
                  alt={program.name_en}
                />
              </div>
              <div>
                <Typography.Text strong>{program.name_en}</Typography.Text>
              </div>
            </Col>
          );
        })}
      </Row>
    </Drawer>
  );
};
