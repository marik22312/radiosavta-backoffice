import React, { useState } from "react";

import { Upload, Form, Button, Progress, Alert } from "antd";
import { useUploadRecordedShow } from "../../../../../../hooks/useUploadRecordedShow";
import { RecordedShowPlayer } from "../../../../../../components/RecordedShowPlayer/RecordedShowPlayer";
import { useProgramById } from "../../../../../../hooks/usePgoramById";
import { BASE_IMAGES_URL } from "../../../../../../config/constants.config";

interface UploadStepProps {
  onSuccess(args: { fileUrl: string; recordedShowId: number }): void;
  programId: string | number;
}

export const UploadStep: React.FC<UploadStepProps> = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [progress, setProgress] = useState(0);

  const { program, isLoading: isProgramLoading } = useProgramById(
    props.programId
  );

  const onUploadProgress = (progressEvent: any) => {
    const completed = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );
    setProgress(completed);
  };

  const { uploadRecordedShow } = useUploadRecordedShow({
    requestConfig: { onUploadProgress },
    onError: (err) => {
      setError(err.response?.data.message);
    },
    onSuccess: (recordedShowResponse) => {
      setProgress(0);
      props.onSuccess(recordedShowResponse);
      setIsLoading(false);
    },
  });

  const uploadRecording = async (values: any) => {
    setIsLoading(true);
    const recordingFile = values.recordedShow.file.originFileObj;
    uploadRecordedShow({
      programId: props.programId,
      recordedShow: recordingFile,
    });
  };

  const onResetForm = () => {
    setPreviewUrl("");
    setError("");
    setProgress(0);
    setIsLoading(false);
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
        {previewUrl && !isProgramLoading && !isLoading ? (
          <RecordedShowPlayer
            name="Preview"
            url={previewUrl}
            backgroundImage={
              program!.cover_image
                ? BASE_IMAGES_URL + "/" + program!.cover_image
                : BASE_IMAGES_URL + "/" + program!.users[0].profile_image
            }
            recordingDate={new Date().toString()}
          />
        ) : isLoading ? (
          <>
            <Progress
              type="circle"
              percent={progress}
              status={error ? "exception" : "active"}
            />
            <Alert
              type="error"
              message={error}
              action={
                <Button size="small" type="text" onClick={onResetForm}>
                  Retry
                </Button>
              }
            />
          </>
        ) : (
          <Upload.Dragger
            listType="text"
            showUploadList={false}
            accept="audio/*"
            customRequest={(o) => {
              const url = URL.createObjectURL(o.file);
              setPreviewUrl(url);
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
          loading={isLoading && !error}
          disabled={isLoading || !!error}
        >
          Next
        </Button>
      </Form.Item>
    </Form>
  );
};
