import React, { useState } from "react";

import { Upload, Form, Button } from "antd";
import { useUploadRecordedShow } from "../../../../../../hooks/useUploadRecordedShow";
import Loader from "react-loader-spinner";
import { RecordedShowPlayer } from "../../../../../../components/RecordedShowPlayer/RecordedShowPlayer";
import { useProgramById } from "../../../../../../hooks/usePgoramById";
import { BASE_IMAGES_URL } from "../../../../../../config/constants.config";

interface UploadStepProps {
  onSuccess(args: { fileUrl: string; recordedShowId: number }): void;
  onError(err: any): void;
  programId: string | number;
}

export const UploadStep: React.FC<UploadStepProps> = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const { program, isLoading: isProgramLoading } = useProgramById(
    props.programId
  );

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
        {previewUrl && !isProgramLoading ? (
          <RecordedShowPlayer
            name="Preview"
            url={previewUrl}
            backgroundImage={
              program!.cover_image
                ? BASE_IMAGES_URL + "/" + program!.cover_image
                : BASE_IMAGES_URL + "/" + program!.users[0].profile_image
            }
            recordingDate={Intl.DateTimeFormat("he").format(Date.now())}
          />
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
          loading={isLoading}
          disabled={isLoading}
        >
          Next
        </Button>
      </Form.Item>
    </Form>
  );
};
