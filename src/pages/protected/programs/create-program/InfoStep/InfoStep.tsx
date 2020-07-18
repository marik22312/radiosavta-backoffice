import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Radio,
  TimePicker,
  Button,
  Upload,
} from "antd";
import { IUser } from "../../../../../models/types";

import { UsersDropdown } from "../../../../../components/UserDropdown/UserDropdown";

export interface InfoStepProps {
  crew: IUser[];
  onChange(value: any): void;
  onFinished(formValues: any): void;
}

export const InfoStep: React.FC<InfoStepProps> = (props) => {
  const DATE_FORMAT = "HH:mm";
  const [picturePreview, setPicturePreview] = useState("");
  return (
    <Row style={{ marginTop: "5px" }}>
      <Col span={24}>
        <Card>
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 12 }}
            onFinish={(values) => props.onFinished(values)}
            scrollToFirstError
          >
            <Form.Item
              required
              label="Upload image"
              name="picture"
              rules={[
                {
                  required: true,
                  message: "Image is required!",
                },
              ]}
            >
              {picturePreview ? (
                <img
                  src={picturePreview}
                  alt="show preview"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              ) : (
                <Upload.Dragger
                  listType="picture"
                  showUploadList={false}
                  accept="image/*"
                  customRequest={(o) => {
                    const url = URL.createObjectURL(o.file);
                    setPicturePreview(url);
                  }}
                >
                  <p>Upload an image</p>
                </Upload.Dragger>
              )}
            </Form.Item>
            <Form.Item
              name="name"
              label="Name"
              required
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Name is required!",
                },
                {
                  min: 3,
                  message: "Minimal program length is 3 characters",
                },
                {
                  max: 64,
                  message: "Maximum program name is 64 chars",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Short Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Description is required!",
                },
                {
                  min: 10,
                  message: "Minimal program length is 10 characters",
                },
                {
                  max: 64,
                  message: "Maximum program name is 64 chars",
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              label="Day of week"
              name="day_of_week"
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
              label="Program Hours"
              name="program_times"
              rules={[{ required: true, message: "Program time is required!" }]}
            >
              <TimePicker format={DATE_FORMAT} minuteStep={15} />
            </Form.Item>
            <Form.Item
              name="crew"
              label="Select crew members"
              rules={[
                {
                  type: "array",
                  min: 1,
                  message: "Please select at least 1 crew member",
                },
                {
                  required: true,
                  message: "Please select at least 1 crew member",
                },
              ]}
            >
              <UsersDropdown users={props.crew} multiple />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Next
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};
