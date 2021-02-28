import React, { useState } from "react";
import { Modal, Input, Form } from "antd";

import { updateUserById } from "../../api/Users.api";

import { IFullUser } from "../../models/types";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  user: IFullUser;
}

const EditUserModal: React.FC<ModalProps> = ({ isOpen, closeModal, user }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [formInstance] = Form.useForm();

  const closeAndReset = () => {
    closeModal();
    formInstance.resetFields();
  };

  const submitModal = async () => {
    setConfirmLoading(true);

    try {
      const values = await formInstance.validateFields();
      const res = await updateUserById(user.id, values);
      setConfirmLoading(false);
      closeModal();
    } catch (e) {
      // handle
      setConfirmLoading(false);
    }
  };

  return (
    <Modal
      title="Edit user"
      visible={isOpen}
      onCancel={closeAndReset}
      onOk={submitModal}
      zIndex={1001} // because UserSidePanel is 1000
      closable
      confirmLoading={confirmLoading}
    >
      <Form
        form={formInstance}
        name="editUserForm"
        initialValues={{ name: user.name, location: user.location }}
      >
        <Form.Item name="name" rules={[{ type: "string", min: 3 }]}>
          <Input placeholder={"Enter name..."} />
        </Form.Item>
        <Form.Item name="location" rules={[{ type: "string", min: 1 }]}>
          <Input placeholder={"Enter location..."} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditUserModal;
