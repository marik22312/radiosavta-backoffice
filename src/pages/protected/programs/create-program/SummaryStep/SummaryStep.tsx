import React, { Fragment } from "react";
import { Card, Descriptions, Col, Row, Typography, Space, Avatar } from "antd";
import moment from "moment";

import { IUser } from "../../../../../models/types";

interface SummaryStepProps {
  picture?: string;
  name?: string;
  description?: string;
  day_of_week?: number;
  time?: string;
  crew?: IUser[];
}

export const SummaryStep: React.FC<SummaryStepProps> = (props) => {
  const { picture, name, description, day_of_week, time, crew } = props;
  return (
    <Fragment>
      <Card style={{ marginTop: "5px" }}>
        <Row>
          <Col span={24} style={{ textAlign: "center" }}>
            <img
              src={picture}
              alt="Preview"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </Col>
          <Col span={24}>
            <Typography.Title level={4}>{name}</Typography.Title>
          </Col>
        </Row>
      </Card>
      <Card style={{ marginTop: "5px" }} title="Description">
        <Row>
          <Col span={24}>
            <Typography.Paragraph
              ellipsis={{ rows: 2, expandable: true, symbol: "more" }}
            >
              {description}
            </Typography.Paragraph>
          </Col>
        </Row>
      </Card>
      <Card style={{ marginTop: "5px" }} title="Program times">
        <Row>
          <Col span={24}>
            <Descriptions layout="vertical">
              <Descriptions.Item label="Day of week">
                {moment.weekdays(day_of_week!)}
              </Descriptions.Item>
              <Descriptions.Item label="Time">{time}</Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Card>
      <Card title="Crew members" style={{ marginTop: "5px" }}>
        <Row>
          {crew?.map((u) => {
            return (
              <Col xs={6}>
                <Avatar
                  src={`https://res.cloudinary.com/marik-shnitman/image/upload/w_254/v1547932540/${u.profile_image}`}
                  shape="square"
                  size={248}
                >
                  {u.name}
                </Avatar>
              </Col>
            );
          })}
        </Row>
      </Card>
    </Fragment>
  );
};
