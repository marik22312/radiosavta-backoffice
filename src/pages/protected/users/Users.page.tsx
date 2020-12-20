import { Row, Table, Avatar } from "antd";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Card } from "../../../components/Card/Card";
import { Page } from "../../../components/Page/Page";
import { UserSidePanel } from "../../../components/UserSidePanel/UserSidePanel";
import { BASE_IMAGES_URL } from "../../../config/constants.config";
import { useUsers } from "../../../hooks/useUsers";

const columns = [
  {
    title: "",
    dataIndex: "profile_image",
    key: "avatar",
    // eslint-disable-next-line react/display-name
    render: (url: string) => {
      return (
        <Avatar size={"large"} src={`${BASE_IMAGES_URL}/${url}`}>
          {url}
        </Avatar>
      );
    },
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Visible on site?",
    dataIndex: "is_admin",
    key: "is_admin",
    // eslint-disable-next-line react/display-name
    render: (isAdmin: boolean) => {
      return <div>{isAdmin ? "No" : "Yes"}</div>;
    },
  },
];

export const UsersPage: React.FC = (props) => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const history = useHistory();
  const { isLoading, users } = useUsers();

  return (
    <Page title="Users List" breadcrumbs={["Home"]}>
      <Card>
        <Card.Content>
          <Table
            loading={isLoading}
            columns={columns}
            dataSource={users}
            onRow={(record) => ({
              //   onClick: () => history.push(`/users/${record.id}`),
              onClick: () => setSelectedUserId(record.id),
            })}
            pagination={{
              position: ["topRight", "bottomRight"],
            }}
          />
        </Card.Content>
      </Card>
      {selectedUserId && (
        <UserSidePanel
          userId={selectedUserId}
          isOpen={!!selectedUserId}
          onClose={() => setSelectedUserId(null)}
        />
      )}
    </Page>
  );
};
