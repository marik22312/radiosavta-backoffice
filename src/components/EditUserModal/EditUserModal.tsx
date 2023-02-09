import React from "react";
import { Modal, Input, Form } from "antd";

import { useUpdateUser } from "../../hooks/useUpdateUser";

import { IFullUser } from "../../models/types";
import { User } from "../../domain/Users";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  onUserUpdated?: () => void;
  user: IFullUser | User;
}

const EditUserModal: React.FC<ModalProps> = ({
  isOpen,
  closeModal,
  user,
  onUserUpdated,
}) => {
  const [formInstance] = Form.useForm();
  const { updateUser, isLoading: isUpdating } = useUpdateUser();

  const closeAndReset = () => {
    closeModal();
    formInstance.resetFields();
  };

  const submitModal = async () => {
    const values = await formInstance.validateFields();

    updateUser(
      { userId: user.id, data: values },
      {
        onSuccess: () => {
          onUserUpdated && onUserUpdated();
          closeModal();
        },
      }
    );
  };

  return (
    <Modal
      title="Edit user"
      visible={isOpen}
      onCancel={closeAndReset}
      onOk={submitModal}
      zIndex={1001} // because UserSidePanel is 1000
      closable
      confirmLoading={isUpdating}
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
