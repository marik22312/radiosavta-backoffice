import { Button, Upload } from "antd";
import { Modal, Form } from "antd";
import React, { useState } from "react";
import { httpClient } from "../../../../services/http.client";
import { IFullProgram } from "../../../../models/types";
import { AxiosRequestConfig } from "axios";

interface EditProgramImageProps {
  program?: IFullProgram;
  imageUrl?: string;
  updateImage: Function;
}

export const EditProgramImage = (props: EditProgramImageProps) => {
  const { program, imageUrl } = props;

  const imageStyle: React.CSSProperties = {
    width: "auto",
    maxHeight: "200px",
    cursor: "pointer",
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState();
  const [localImageUrl, setLocalImageUrl] = useState("");

  const onCancel = () => {
    setModalOpen(false);
    setLocalImageUrl("");
  };

  const onOk = (values: any) => {
    console.log(values.picture, values.file);
    const headers: AxiosRequestConfig = { headers: {} };
    headers.headers["Content-Type"] = "multipart/form-data";
    const localData = new FormData(formData);
    httpClient.put(
      `/v2/programs/${props.program?.id}/image`,
      localData,
      headers
    );
  };

  return (
    <>
      <img
        onClick={() => setModalOpen(true)}
        alt={program?.name_en}
        src={
          "https://res.cloudinary.com/marik-shnitman/image/upload/w_600/v1547932540/" +
          imageUrl
        }
        style={imageStyle}
      />
      <Modal visible={modalOpen} onCancel={() => onCancel()} onOk={onOk}>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 12 }}
          onValuesChange={(changed, all) => {
            setFormData(changed.picture.file.originFileObj);
          }}
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
            {localImageUrl ? (
              <img
                src={localImageUrl}
                alt="show preview"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            ) : (
              <Upload.Dragger
                listType="picture"
                showUploadList={false}
                accept="image/*"
                customRequest={(o: any) => {
                  const url = URL.createObjectURL(o.file);
                  setLocalImageUrl(url);
                }}
              >
                <p>Upload an image</p>
              </Upload.Dragger>
            )}
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Next
          </Button>
        </Form>
      </Modal>
    </>
  );
};
