import React, { createRef, useEffect, useRef, useState } from "react";
import { Alert, Button, Modal, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
export interface EditImageModalProps {
  isOpen: boolean;
  title?: string;
  onOk: (file: File) => void;
  onCancel: () => void;
  isLoading?: boolean;
  errorMessage?: string;
}

export const EditImageModal: React.FC<EditImageModalProps> = (props) => {
  const [previewImageUrl, setPreviewImageUrl] = useState<string>();
  const [fileToUpload, setFileToUpload] = useState<File>();

  useEffect(() => {
    if (!props.isOpen) {
      onReset();
    }
  }, [props.isOpen]);

  const onReset = () => {
    setPreviewImageUrl(undefined);
    setFileToUpload(undefined);
  };

  const onChange = (file: File) => {
    const url = URL.createObjectURL(file);
    setPreviewImageUrl(url);
    setFileToUpload(file);
  };

  const onOk = () => {
    if (fileToUpload) {
      props.onOk(fileToUpload);
    }
  };

  const onCancel = () => {
    props.onCancel();
  };

  return (
    <Modal
      onCancel={onCancel}
      visible={props.isOpen}
      title={props.title ?? "Change Image"}
      okText="Save"
      cancelText="Cancel"
      okButtonProps={{
        disabled: !fileToUpload,
        loading: props.isLoading,
      }}
      onOk={onOk}
    >
      {props.errorMessage && (
        <Alert message={props.errorMessage} type="error" />
      )}
      {!fileToUpload ? (
        <ImageUpload onChange={onChange}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag Image to this area to upload
          </p>
        </ImageUpload>
      ) : (
        <PreviewImage src={previewImageUrl} onReset={onReset} />
      )}
    </Modal>
  );
};

const PreviewImage: React.FC<{ src?: string; onReset: () => void }> = (
  props
) => {
  return (
    <>
      <div style={{ aspectRatio: "16 / 9" }}>
        <img
          src={props.src}
          alt="show preview"
          style={{ height: "100%", width: "100%", objectFit: "cover" }}
        />
      </div>
      <Button onClick={props.onReset} danger>
        Reset
      </Button>
    </>
  );
};

const ImageUpload: React.FC<{ onChange: (file: File) => void }> = (props) => {
  return (
    <Upload.Dragger
      name="file"
      multiple={false}
      showUploadList={false}
      accept="image/*"
      customRequest={(o) => {
        props.onChange(o.file as File);
      }}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag Image to this area to upload
      </p>
    </Upload.Dragger>
  );
};
