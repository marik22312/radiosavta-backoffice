import React, { useEffect } from "react";
import { Modal, Input, Form } from "antd";

import { useRecordedShowById } from "../../hooks/useRecordedShowById";
import { useEditRecordedShow } from "../../hooks/useEditRecordedShow";
import { showErrorToast } from "../../utils/toast.util";

export interface EditRecordedShowModalProps {
  isOpen: boolean;
  onClose: () => void;
  recordedShowId: string | number;
}

export const EditRecordedShow: React.FC<EditRecordedShowModalProps> = ({
  isOpen,
  onClose,
  recordedShowId,
}) => {
  const { recordedShow, isLoading } = useRecordedShowById(recordedShowId);
  const { editRecordedShow, isLoading: isUpdating } = useEditRecordedShow(
    recordedShowId,
    {
      onSuccess: onClose,
      onError: () =>
        showErrorToast("Something went wrong, please try again later"),
    }
  );

  const [formInstance] = Form.useForm();

  useEffect(() => {
    formInstance.setFieldsValue({ name: recordedShow?.name });
  }, [formInstance, recordedShow]);

  const closeAndReset = () => {
    formInstance.resetFields();
    onClose();
  };

  const updateShow = (values: any) => {
    editRecordedShow({ name: values.name });
  };

  const submitModal = async () => {
    const values = await formInstance.validateFields();

    updateShow(values);
  };

  return (
    <Modal
      title={`Rename ${recordedShow?.name}` || "Loading..."}
      visible={true}
      onCancel={closeAndReset}
      onOk={submitModal}
      zIndex={1001} // because UserSidePanel is 1000
      closable
      confirmLoading={isUpdating}
    >
      <Form
        form={formInstance}
        name="editUserForm"
        initialValues={{ name: recordedShow?.name }}
      >
        <Form.Item name="name" rules={[{ type: "string", min: 3 }]}>
          <Input placeholder={"Enter name..."} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
