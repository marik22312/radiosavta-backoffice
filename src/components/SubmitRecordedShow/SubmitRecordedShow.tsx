import React from "react";
import { Row, Col, Input, Descriptions, Button, Divider } from "antd";
import { ValidateRecordedShowResponse } from "../../services/programs.service";

export interface ValidateRecordedShowProps {
  isLoading: boolean;
  onSubmit(url: string): void;
}
export const ValidateRecordedShow: React.FC<ValidateRecordedShowProps> = (
  props
) => {
  return (
    <Row>
      <Col span={24}>
        <Input.Search
          placeholder="Recorded show Mixcloud URL"
          enterButton="Verify"
          loading={props.isLoading}
          disabled={props.isLoading}
          size="large"
          onSearch={(value: string) => props.onSubmit(value)}
        />
      </Col>
    </Row>
  );
};
export interface SubmitRecordedShowProps {
  isLoading: boolean;
  onSubmit(show: ValidateRecordedShowResponse): void;
  recordedShow: ValidateRecordedShowResponse;
}

export const SubmitRecordedShow: React.FC<SubmitRecordedShowProps> = (
  props
) => {
  const { recordedShow } = props;
  return (
    <Row>
      <Col span={24}>
        <Descriptions title={recordedShow!.name} layout="vertical">
          {/* <Descriptions.Item label="Name"></Descriptions.Item> */}
          <Descriptions.Item label="Duration">
            {recordedShow?.duration}
          </Descriptions.Item>
          <Descriptions.Item label="Recorded at">
            {recordedShow?.recorded_at}
          </Descriptions.Item>
          <Descriptions.Item label="Url">
            <a href={recordedShow!.url} target="_blank">
              {recordedShow?.url}
            </a>
          </Descriptions.Item>
        </Descriptions>
      </Col>
      <Col style={{ margin: "auto" }}>
        <Button
          onClick={() => props.onSubmit(props.recordedShow)}
          loading={props.isLoading}
        >
          Submit!
        </Button>
      </Col>
      <Divider />
    </Row>
  );
};
