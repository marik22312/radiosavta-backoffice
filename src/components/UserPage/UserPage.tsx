import { Button, Card, Col, Descriptions, Row, Table, Typography } from "antd";
import React from "react";
import { Image } from "../../components/Image/Image";
import { Page } from "../../components/Page/Page";
import { User } from "../../domain/Users";
import { Program } from "../../domain/Programs";
import { useHistory } from "react-router-dom";
import { ListenerStatistics } from "../ListenerStatistics/ListenerStatistics";
import {
  RADIO_SERVER_MOUNT,
  RADIO_SERVER_PORT,
  RADIO_SERVER_URL,
} from "../../config/constants.config";
import { UserBroadcastDetailsCard } from "../UserBroadcastDetailsCard";

const ProgramActions: React.FC<{ program: Program }> = (props) => {
  const history = useHistory();

  return (
    <Button
      type="link"
      onClick={() => history.push(`/programs/${props.program.id}`)}
    >
      Open
    </Button>
  );
};

const columns = [
  {
    title: "#",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name_en",
    key: "inamed",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    // eslint-disable-next-line
    render: (text: string, src: Program) => <ProgramActions program={src}/>,
    fixed: true,
  },
];

export const UserPage: React.FC<{
  user: User;
  title?: string;
  onClickEditUser?: () => void;
  onClickEditUserImage?: () => void;
}> = (props) => {
  const { user, title } = props;

  return (
    <Page title={title || user.name}>
      <Row>
        <Col span={24}>
          <Card
            title="Personal details"
            extra={
              <>
                {props.onClickEditUser && (
                  <Button type="primary" onClick={props.onClickEditUser}>
                    Edit
                  </Button>
                )}
                {props.onClickEditUserImage && (
                  <Button onClick={props.onClickEditUserImage}>
                    Edit Image
                  </Button>
                )}
                {/* // TODO: Refactor change password modal to work with external consumers */}
                {/* <Button>Change password</Button> */}
              </>
            }
          >
            <Row>
              <Col span={6}>
                <Image src={user?.profile_image} />
              </Col>
              <Col span={18}>
                <Descriptions layout="vertical">
                  <Descriptions.Item
                    label="Name"
                    labelStyle={{ fontWeight: "bold" }}
                  >
                    {user?.name}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label="Email"
                    labelStyle={{ fontWeight: "bold" }}
                  >
                    {user?.email}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label="Location"
                    labelStyle={{ fontWeight: "bold" }}
                  >
                    {user?.location}
                  </Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Card title="My Programs">
            <Table
              columns={columns}
              dataSource={user?.programs as unknown as Program[]}
              onRow={(record) => ({
                // onClick: () => this.props.history.push(`programs/${record.id}`),
              })}
              pagination={{
                position: [],
              }}
            />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={12}></Col>
      </Row>
      <UserBroadcastDetailsCard />
      <Card title="My Stats">
        <ListenerStatistics />
      </Card>
    </Page>
  );
};
