import { Modal } from "antd";
import React from "react";

export interface ConfirmationModalProps {
  message: string;
  title: string;
  onCancel: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}
export const ConfirmationModal: React.FC<ConfirmationModalProps> = (props) => {
  return (
    <Modal
      title={props.title}
      visible={true}
      onCancel={props.onCancel}
      onOk={props.onConfirm}
      zIndex={1001} // because UserSidePanel is 1000
      closable
      confirmLoading={props.isLoading}
    >
      {props.message}
    </Modal>
  );
};
