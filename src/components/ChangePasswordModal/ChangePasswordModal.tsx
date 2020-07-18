import React, { useState } from "react";

import { Modal, Form, Input, Alert } from "antd";

interface Props {
  isOpen: boolean;
  toggle: any;
  onSubmit(values: ChangeFormFields): Promise<any>;
}

interface ChangeFormFields {
  newPassword: string;
  passwordRepeat: string;
  oldPassword: string;
}

export const ChangePasswordModal: React.FC<Props> = (props) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { toggle } = props;

  const [form] = Form.useForm();

  const handleSubmit = async (values: ChangeFormFields) => {
    setIsLoading(true);
    const response = await props.onSubmit(values);
    if (response) {
      setIsLoading(false);
      setError(response);
      return;
    }
    setIsLoading(false);
    setError(null);
    return;
  };

  return (
    <Modal
      visible={props.isOpen}
      title="Change Password"
      onCancel={toggle}
      confirmLoading={isLoading}
      onOk={() => {
        form
          .validateFields()
          .then((values: any) => {
            handleSubmit(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
        <Form.Item label="Current Password" name="oldPassword">
          <Input
            disabled={isLoading}
            type="password"
            placeholder="Current password"
          />
        </Form.Item>
        <Form.Item
          name="newPassword"
          label="New Password"
          rules={[
            {
              required: true,
              message: "Please type new password",
            },
          ]}
        >
          <Input
            disabled={isLoading}
            type="password"
            placeholder="New password"
          />
        </Form.Item>
        <Form.Item
          name="passwordRepeat"
          label="Repeat new password"
          rules={[
            {
              required: true,
              message: "Please repeat password",
            },
          ]}
        >
          <Input
            disabled={isLoading}
            type="password"
            placeholder="Repeat new password"
          />
        </Form.Item>
        {error && (
          <Alert type="error" message={`Command failed with error ${error}`} />
        )}
      </Form>
    </Modal>
  );
};
