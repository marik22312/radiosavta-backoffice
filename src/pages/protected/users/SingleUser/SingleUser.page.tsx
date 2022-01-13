import {
  Row,
  Table,
  Avatar,
  Space,
  Col,
  Descriptions,
  Typography,
  Divider,
  Button,
} from "antd";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { Card } from "../../../../components/Card/Card";
import { Page } from "../../../../components/Page/Page";
import { BASE_IMAGES_URL } from "../../../../config/constants.config";
import { useUserById } from "../../../../hooks/useUserById";
import css from "./SingleUserPage.module.scss";

export const SingleUserPage: React.FC = (props) => {
  const history = useHistory();
  const { userId } = useParams<{ userId: string }>();
  const { isLoading, user } = useUserById(userId);

  return (
    <Page breadcrumbs={["Home", "Users"]}>
      {/* <Grid> */}
      <Space direction="vertical">
        <Row justify="space-between">
          <Col span={17}>
            <Card loading={isLoading}>
              <Card.Title title={user?.name || ""} />
              <Card.Content>
                <Row>
                  <Col span={12}>
                    <Avatar
                      style={{
                        textAlign: "center",
                        margin: "auto",
                      }}
                      size={200}
                      src={`${BASE_IMAGES_URL}/${user?.profile_image}`}
                    />
                  </Col>
                  <Col span={12}>
                    <Descriptions layout="horizontal" column={1}>
                      <Descriptions.Item label={"Email"}>
                        {user?.email}
                      </Descriptions.Item>
                      <Descriptions.Item label={"location"}>
                        {user?.location}
                      </Descriptions.Item>
                    </Descriptions>
                  </Col>
                </Row>
              </Card.Content>
            </Card>
          </Col>
          <Col span={6}>
            <Card fullHeight>
              <Card.Title title="DJ Account Info" />
              <Card.Content>
                <Row justify="space-around">
                  <Col span={24}>
                    <Descriptions layout="horizontal" column={1}>
                      <Descriptions.Item label={"Streamer name"}>
                        {user?.streamer?.[0].display_name}
                      </Descriptions.Item>
                      <Descriptions.Item label={"Username"}>
                        {user?.streamer?.[0].user_name}
                      </Descriptions.Item>
                    </Descriptions>
                  </Col>
                  <Col span={24}>
                    <Button>Reset Password</Button>
                  </Col>
                </Row>
              </Card.Content>
            </Card>
          </Col>
        </Row>

        {!!user?.programs?.length && (
          <>
            <Divider orientation="left">Associated Programs</Divider>
            <Space>
              {user?.programs?.map((program) => {
                return (
                  <Card
                    interactive
                    onClick={() => history.push(`/programs/${program.id}`)}
                  >
                    <Card.Content>
                      <div className={css.programTile}>
                        <Space direction="vertical" size="large" align="center">
                          <Avatar
                            size={200}
                            src={`${BASE_IMAGES_URL}/${program.cover_image}`}
                          />
                          <Typography.Title level={5}>
                            {program.name_en}
                          </Typography.Title>
                        </Space>
                      </div>
                    </Card.Content>
                  </Card>
                );
              })}
            </Space>
          </>
        )}
      </Space>
    </Page>
  );
};
