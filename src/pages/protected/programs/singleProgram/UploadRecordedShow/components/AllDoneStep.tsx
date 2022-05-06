import React from "react";

import { Button, Col, Divider, Row, Typography } from "antd";
import { useRecordedShowById } from "../../../../../../hooks/useRecordedShowById";
import { RecordedShowPlayer } from "../../../../../../components/RecordedShowPlayer/RecordedShowPlayer";
import { BASE_IMAGES_URL } from "../../../../../../config/constants.config";
import Loader from "react-loader-spinner";
import { useHistory, useParams } from "react-router-dom";
import {
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  TwitterIcon,
  TwitterShareButton,
  TelegramIcon,
  TelegramShareButton,
} from "react-share";
import { showSuccessToast } from "../../../../../../utils/toast.util";
export interface AllDoneStepProps {
  recordedShowId: string | number;
  onClickStartOver(): void;
}
export const AllDoneStep: React.FC<AllDoneStepProps> = (props) => {
  const { recordedShow, isLoading } = useRecordedShowById(props.recordedShowId);
  const history = useHistory();
  const { programId } = useParams<{ programId: string }>();

  const shareableRecordedShowUrl = `https://www.radiosavta.com/archive?showId=${props.recordedShowId}`;
  return (
    <div>
      <Typography.Title>All Done!</Typography.Title>
      <Typography.Text>Your recording was uploaded succesfully</Typography.Text>
      <Divider />
      <Row>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Col span={12}>
              <RecordedShowPlayer
                url={recordedShow!.url}
                name={recordedShow!.name!}
                recordingDate={recordedShow!.created_at}
                backgroundImage={`${BASE_IMAGES_URL}/${
                  recordedShow?.program?.cover_image ||
                  recordedShow?.program?.users[0].profile_image
                }`}
              />
            </Col>
            <Col span={12}>
              <div>
                <h5>Share recorded show</h5>
                <div>
                  <FacebookShareButton url={shareableRecordedShowUrl}>
                    <FacebookIcon />
                  </FacebookShareButton>
                  <WhatsappShareButton url={shareableRecordedShowUrl}>
                    <WhatsappIcon />
                  </WhatsappShareButton>
                  <TelegramShareButton url={shareableRecordedShowUrl}>
                    <TelegramIcon />
                  </TelegramShareButton>
                  <TwitterShareButton url={shareableRecordedShowUrl}>
                    <TwitterIcon />
                  </TwitterShareButton>
                </div>
                <div>
                  <input
                    onFocus={(e) => {
                      e.currentTarget.select();
                      navigator.clipboard
                        .writeText(shareableRecordedShowUrl)
                        .then(() => {
                          showSuccessToast("Copied to clipboard");
                        });
                    }}
                    style={{ width: "100%" }}
                    type="text"
                    readOnly
                    value={shareableRecordedShowUrl}
                  />
                </div>
              </div>
            </Col>
          </>
        )}
      </Row>
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
