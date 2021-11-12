import React, { useState } from "react";

import { Alert, Form, Switch, Button, Upload, Input } from "antd";

import { CreateUserRequest } from "../../../../../api/Users.api";
import { useCreateUser } from "../hooks/useCreateUser";
import { User } from "../../../../../domain/Users";

export interface CreateUserFormProps {
  onUserCreated?(user: User): void;
  onError?(e: any): void;
}
export const CreateUserForm: React.FC<CreateUserFormProps> = (props) => {
  const [fileUrl, setFileUrl] = useState("");
  const [fileToUpload, setFileToUpload] = useState<null | File>(null);
  const [error, setError] = useState<null | string>(null);

  const onUserCreated = (user: User) => {
    props?.onUserCreated && props.onUserCreated(user);
  };

  const onError = (err: any) => {
    props?.onError && props.onError(err);
  };

  const { createUser, isLoading } = useCreateUser({
    onSuccess: ({ user }) => onUserCreated(user),
    onError,
  });

  const onFileChanged = (event: any) => {
    setFileUrl(URL.createObjectURL(event.file));
    setFileToUpload(event.file);
  };

  const onFormSubmit = async (values: CreateUserRequest) => {
    setError(null);
    const newValues: CreateUserRequest = {
      ...values,
      profile_picture: fileToUpload!,
    };
    try {
      createUser(newValues);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Form
      onFinish={(values: any) => {
        onFormSubmit(values);
      }}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 14 }}
    >
      {fileUrl ? (
        <div style={{ textAlign: "center" }}>
          <img
            data-testid="profile-image"
            src={fileUrl}
            alt="show preview"
            style={{ width: "auto", height: "400px" }}
          />
        </div>
      ) : (
        <Form.Item
          label="Profile Picture"
          name="profile_picture"
          rules={[
            {
              required: true,
              message: "Profile picture is required!",
            },
          ]}
        >
          <Upload.Dragger
            data-testid="picture-input"
            listType="picture"
            showUploadList={false}
            accept="image/*"
            customRequest={(e) => onFileChanged(e)}
          >
            <p>Upload an image</p>
          </Upload.Dragger>
        </Form.Item>
      )}
      <Form.Item
        label="Full name"
        name="name"
        rules={[
          {
            required: true,
            message: "Full name is required!",
          },
          {
            min: 3,
            message: "User name must be atleast 3 characters long",
          },
        ]}
      >
        <Input id="name" placeholder="John Smith" data-testid="name-input" />
      </Form.Item>
      <Form.Item
        label="Email Address"
        name="email"
        rules={[
          {
            required: true,
            message: "Email is required!",
          },
        ]}
      >
        <Input
          data-testid="email-input"
          type="email"
          placeholder="Johns@radiosavta.com"
          autoComplete="off"
        />
      </Form.Item>
      <Form.Item
        label="Location"
        name="location"
        rules={[
          {
            required: true,
            message: "Profile picture is required!",
          },
        ]}
      >
        <Input
          data-testid="location-input"
          placeholder="Mitspe Ramon, Israel"
        />
      </Form.Item>
      <Form.Item label="Streamer Username" name="streamerUsername">
        <Input
          data-testid="streamer-username-input"
          placeholder="Streamer Username"
          autoComplete="off"
          type="text"
        />
      </Form.Item>
      <Form.Item label="Show on site?" name="showOnWebsite">
        <Switch />
      </Form.Item>
      <Form.Item>
        <Button
          data-testid="submit-button"
          type="primary"
          htmlType="submit"
          loading={isLoading}
          disabled={isLoading}
        >
          Submit
        </Button>
      </Form.Item>
      {error && <Alert type="error" message={error} />}
    </Form>
  );
};
