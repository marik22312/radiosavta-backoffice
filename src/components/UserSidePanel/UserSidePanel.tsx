import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useUserById } from "../../hooks/useUserById";
import { createElement } from "react";

import EditUserModal from "../EditUserModal/EditUserModal";

import {
  Avatar,
  Col,
  Descriptions,
  Divider,
  Drawer,
  Row,
  Space,
  Typography,
} from "antd";

import { EditOutlined } from "@ant-design/icons";

import { BASE_IMAGES_URL } from "../../config/constants.config";
import { useHistory } from "react-router-dom";
import { IProgram } from "../../models/types";

interface UserSidePanelProps {
  userId: number;
  isOpen: boolean;
  onClose: () => void;
}
export const UserSidePanel: React.FC<UserSidePanelProps> = (props) => {
  const { user } = useUserById(props.userId);
  const history = useHistory();
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const DrawerHeader = () => {
    return (
      <Row justify="space-between">
        <Col>{user?.name}</Col>
        <Col>
          <EditOutlined onClick={openModal} />
        </Col>
      </Row>
    );
  };

  const renderProgramTile = (program: IProgram) => {
    return (
      <Col onClick={() => history.push(`/programs/${program.id}`)}>
        <div>
          <Avatar
            shape="square"
            size={100}
            src={`${BASE_IMAGES_URL}/${program.cover_image}`}
            alt={program.name_en}
          >
            No Photo Available
          </Avatar>
        </div>
        <div>
          <Typography.Text strong>{program.name_en}</Typography.Text>
        </div>
      </Col>
    );
  };
  return (
    <>
      <Drawer
        title={<DrawerHeader />}
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
                user?.profile_image &&
                `${BASE_IMAGES_URL}/${user?.profile_image}`
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
        {!!user?.programs.length && (
          <>
            <Divider />
            <Row>
              <Col span={24}>
                <Typography.Title level={5}>Participating in</Typography.Title>
              </Col>
              {user?.programs.map((program) => renderProgramTile(program))}
            </Row>
          </>
        )}
      </Drawer>
      {!!user && (
        <EditUserModal isOpen={modalOpen} closeModal={closeModal} user={user} />
      )}
    </>
  );
};
