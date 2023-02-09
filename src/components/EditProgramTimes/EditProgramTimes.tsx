import React, { useEffect, useState } from "react";
import { Modal, Form, Radio, TimePicker, Alert } from "antd";
import { IProgram } from "../../models/types";
import moment from "moment";
import { useSetProgramTime } from "../../hooks/useSetProgramTime";

interface EditProgramTimesProps {
  isOpen: boolean;
  programId?: string | number;
  dayOfWeek?: number;
  startTime?: Date;
  onClose(): void;
}

export const EditProgramTimes: React.FC<EditProgramTimesProps> = (props) => {
  const [formRef] = Form.useForm();
  const {
    setProgramTime,
    isLoading,
    error: SetProgramTimeError,
    reset: resetSetProgramTime,
    isSuccess,
  } = useSetProgramTime();

  useEffect(() => {
    formRef.setFieldsValue({
      dayOfWeek: props.dayOfWeek?.toString(),
      startTime: props.startTime && moment(props.startTime, "HH:mm"),
    });
    resetSetProgramTime();
  }, [
    formRef,
    props.dayOfWeek,
    props.startTime,
    props.isOpen,
    resetSetProgramTime,
  ]);

  return (
    <Modal
      title="Edit Program Time"
      visible={props.isOpen}
      confirmLoading={isLoading}
      onOk={async () => {
        const values = await formRef.validateFields();

        setProgramTime({
          programId: props.programId,
          programTime: {
            start_time: values.startTime.format("HH:mm"),
            day_of_week: values.dayOfWeek,
          },
        });
      }}
      onCancel={props.onClose}
    >
      <Form
        form={formRef}
        initialValues={{
          dayOfWeek: props.dayOfWeek?.toString(),
          startTime: props.startTime && moment(props.startTime),
        }}
        scrollToFirstError
      >
        <Form.Item
          label="Day of week"
          name="dayOfWeek"
          rules={[
            {
              required: true,
              message: "Day of week day is required!",
            },
          ]}
        >
          <Radio.Group>
            <Radio value="0">Sunday</Radio>
            <Radio value="1">Monday</Radio>
            <Radio value="2">Tuesday</Radio>
            <Radio value="3">Wednesday</Radio>
            <Radio value="4">Thursday</Radio>
            <Radio value="5">Friday</Radio>
            <Radio value="6">Saturday</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Start Time"
          name="startTime"
          rules={[{ required: true, message: "Program time is required!" }]}
        >
          <TimePicker format={"HH:mm"} minuteStep={15} />
        </Form.Item>
      </Form>
      {SetProgramTimeError && <Alert type={"error"} message={"Error occurd"} />}
      {isSuccess && (
        <Alert type="success" message={"Time chaged successfully"} />
      )}
    </Modal>
  );
};
