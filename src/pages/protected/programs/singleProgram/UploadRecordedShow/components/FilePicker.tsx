import React from "react";
import Loader from "react-loader-spinner";

import { Upload } from "antd";

interface FilePickerProps {
  onChange(): void;
  isLoading?: boolean;
  accept?: string;
}

export const FilePicker: React.FC<FilePickerProps> = (props) => {
  if (props.isLoading) {
    return (
      <div
        style={{
          height: "300px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader />
      </div>
    );
  }

  return (
    <Upload.Dragger
      listType="text"
      showUploadList={false}
      accept={props.accept}
      customRequest={(o) => {
        const url = URL.createObjectURL(o.file);
        // setPreviewUrl(url);
      }}
    >
      <div
        style={{
          height: "300px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p>Drag file here or click to select</p>
      </div>
    </Upload.Dragger>
  );
};
