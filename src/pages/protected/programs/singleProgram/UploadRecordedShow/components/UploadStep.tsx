import React, { useState } from "react";

import { Upload, Form, Button } from "antd";
import { useUploadRecordedShow } from "../../../../../../hooks/useUploadRecordedShow";
import Loader from "react-loader-spinner";

interface UploadStepProps {
  onSuccess(args: { fileUrl: string; recordedShowId: number }): void;
  onError(err: any): void;
  programId: string | number;
}

export const UploadStep: React.FC<UploadStepProps> = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const { uploadRecordedShow } = useUploadRecordedShow();

  const uploadRecording = async (values: any) => {
    setIsLoading(true);
    const recordingFile = values.recordedShow.file.originFileObj;
    const recordedShowResponse = await uploadRecordedShow({
      programId: props.programId,
      recordedShow: recordingFile,
    });
    setIsLoading(false);
    props.onSuccess(recordedShowResponse);
  };

  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 12 }}
      onFinish={(values) => uploadRecording(values)}
      scrollToFirstError
    >
      <Form.Item
        required
        label={`Upload Recording`}
        name="recordedShow"
        rules={[
          {
            required: true,
            message: "Image is required!",
          },
        ]}
      >
        {isLoading ? (
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
        ) : (
          <Upload.Dragger
            listType="text"
            showUploadList={false}
            accept="audio/*"
            customRequest={(o) => {
              // const url = URL.createObjectURL(o.file);
              // setPicturePreview(url);
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
        )}
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading}
          disabled={isLoading}
        >
          Next
        </Button>
      </Form.Item>
    </Form>
  );
};
