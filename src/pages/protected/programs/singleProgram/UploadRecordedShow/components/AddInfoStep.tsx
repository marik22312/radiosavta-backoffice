import React, { useState } from "react";

import { Input, Form, Button } from "antd";
import { RecordedShowPlayer } from "../../../../../../components/RecordedShowPlayer/RecordedShowPlayer";
import { useProgramById } from "../../../../../../hooks/usePgoramById";
import { BASE_IMAGES_URL } from "../../../../../../config/constants.config";
import { useRecordedShowById } from "../../../../../../hooks/useRecordedShowById";
import Loader from "react-loader-spinner";
import { usePublisRecordedShow } from "../../../../../../hooks/usePublishRecordedShow";

interface AddInfoStepProps {
  onSuccess(): void;
  onError(err: any): void;
  programId: string | number;
  recordedShowId: string | number;
}

export const AddInfoStep: React.FC<AddInfoStepProps> = (props) => {
  const { program } = useProgramById(props.programId);
  const { recordedShow, isLoading: isLoadingRecordedShow } =
    useRecordedShowById(props.recordedShowId);
  const { publishRecordedShow, isLoading: isPublishLoading } =
    usePublisRecordedShow();

  const [title, setTitle] = useState("Program title");

  const onSubmit = async ({ name }: any) => {
    await publishRecordedShow({
      recordedShowId: props.recordedShowId,
      programId: props.programId,
      name,
    });
    props.onSuccess();
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        {isLoadingRecordedShow ? (
          <Loader />
        ) : (
          <RecordedShowPlayer
            url={recordedShow!.url}
            name={title || "Title Is Missing"}
            backgroundImage={`${BASE_IMAGES_URL}/${
              program?.cover_image || program?.users[0].profile_image
            }`}
            recordingDate={recordedShow!.created_at}
          />
        )}
      </div>
      <Form
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        onFinish={(values) => onSubmit(values)}
        scrollToFirstError
      >
        <Form.Item
          required
          label={`Enter RecordedShowTitle`}
          name="name"
          rules={[
            {
              required: true,
              message: "Recorded Show Title is required",
            },
          ]}
        >
          {/* @ts-expect-error*/}
          <Input onChangeCapture={(e) => setTitle(e.target.value)} />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isPublishLoading || isLoadingRecordedShow}
            disabled={isPublishLoading || isLoadingRecordedShow}
          >
            Next
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
