import React, { useState } from "react";
import { useUserById } from "../../hooks/useUserById";

import EditUserModal from "../EditUserModal/EditUserModal";

import {
  Avatar,
  Col,
  Descriptions,
  Divider,
  Drawer,
  Row,
  Typography,
} from "antd";

import { EditOutlined } from "@ant-design/icons";

import { BASE_IMAGES_URL } from "../../config/constants.config";
import { ProgramTile } from "../../pages/protected/programs/program-tile/programTile";

interface UserSidePanelProps {
  userId: number;
  isOpen: boolean;
  onClose: () => void;
}
export const UserSidePanel: React.FC<UserSidePanelProps> = (props) => {
  const { user } = useUserById(props.userId);
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
        {!!user?.programs?.length && (
          <>
            <Divider />
            <Row>
              <Col span={24}>
                <Typography.Title level={5}>Participating in</Typography.Title>
              </Col>
              {user?.programs?.map((program) => {
                return <ProgramTile key={program.id} {...program} />;
              })}
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
