import { Button, Card, Col, Descriptions, Row, Table, Typography } from "antd";
import React from "react";
import { Image } from "../../components/Image/Image";
import { Page } from "../../components/Page/Page";
import { User } from "../../domain/Users";
import { Program } from "../../domain/Programs";
import { useHistory } from "react-router-dom";
import { ListenerStatistics } from "../ListenerStatistics/ListenerStatistics";

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
                <Descriptions>
                  <Descriptions.Item label="Name">
                    {user?.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Email">
                    {user?.email}
                  </Descriptions.Item>
                  <Descriptions.Item label="Location">
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
      <Card
        title={"Broadcasting & Streamer"}
        extra={
          <a
            href="https://docs.azuracast.com/en/user-guide/streaming-software"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button>Configure Connection</Button>
          </a>
        }
      >
        <Row>
          <Col span={12}>
            <Descriptions title={"Connection information"} layout="vertical">
              <Descriptions.Item
                label="Username"
                labelStyle={{ fontWeight: "bold" }}
              >
                {user?.streamer?.[0].user_name}
              </Descriptions.Item>
              <Descriptions.Item
                label="Display name"
                labelStyle={{ fontWeight: "bold" }}
              >
                {user?.streamer?.[0].display_name}
              </Descriptions.Item>
            </Descriptions>
          </Col>
          <Col span={12}>
            {" "}
            <Descriptions title={"Connection Config"} layout="vertical">
              <Descriptions.Item
                label="Host"
                labelStyle={{ fontWeight: "bold" }}
              >
                broadcast.radiosavta.com
              </Descriptions.Item>
              <Descriptions.Item
                label="Port"
                labelStyle={{ fontWeight: "bold" }}
              >
                8005
              </Descriptions.Item>
              <Descriptions.Item
                label="Mount"
                labelStyle={{ fontWeight: "bold" }}
              >
                /
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Card>
      <Card title="My Stats">
        <ListenerStatistics />
      </Card>
    </Page>
  );
};
