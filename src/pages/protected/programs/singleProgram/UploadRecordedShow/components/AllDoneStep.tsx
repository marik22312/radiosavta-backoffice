import React from "react";

import { Button, Divider, Typography } from "antd";
import { useRecordedShowById } from "../../../../../../hooks/useRecordedShowById";
import { RecordedShowPlayer } from "../../../../../../components/RecordedShowPlayer/RecordedShowPlayer";
import { BASE_IMAGES_URL } from "../../../../../../config/constants.config";
import Loader from "react-loader-spinner";
import { useHistory, useParams } from "react-router-dom";
export interface AllDoneStepProps {
  recordedShowId: string | number;
  onClickStartOver(): void;
}
export const AllDoneStep: React.FC<AllDoneStepProps> = (props) => {
  const { recordedShow, isLoading } = useRecordedShowById(props.recordedShowId);
  const history = useHistory();
  const { programId } = useParams<{ programId: string }>();
  return (
    <div>
      <Typography.Title>All Done!</Typography.Title>
      <Typography.Text>Your recording was uploaded succesfully</Typography.Text>
      <Divider />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "15px",
        }}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <RecordedShowPlayer
            url={recordedShow!.url}
            name={recordedShow!.name!}
            recordingDate={recordedShow!.created_at}
            backgroundImage={`${BASE_IMAGES_URL}/${
              recordedShow?.program?.cover_image ||
              recordedShow?.program?.users[0].profile_image
            }`}
          />
        )}
      </div>
      <Divider />
      <div
        style={{
          margin: "15px 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button type="primary" onClick={() => props.onClickStartOver()}>
          Upload Another One
        </Button>
        <Button
          type="primary"
          onClick={() => history.push(`/programs/${programId}`)}
        >
          Back to Program page
        </Button>
      </div>
    </div>
  );
};
