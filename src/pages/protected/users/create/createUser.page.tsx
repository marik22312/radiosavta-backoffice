import React from "react";
import { useHistory } from "react-router-dom";

import { Form, Row, Col, Card } from "antd";

import { Page } from "../../../../components/Page/Page";
import { CreateUserForm } from "./components/CreateUserForm";
import { User } from "../../../../domain/Users";
import { showGeneralErrorToast } from "../../../../utils/toast.util";

export const CreateUserPage: React.FC = () => {
  const history = useHistory();

  const onUserCreated = (user: User) => {
    history.push(`/users/`);
  };

  const onError = (err: any) => {
    showGeneralErrorToast(err);
  };
  return (
    <Page breadcrumbs={["Users"]} title="Create User">
      <Form autoComplete="off">
        <Card>
          <Row>
            <Col span={24}>
              <CreateUserForm
                onUserCreated={(user) => onUserCreated(user)}
                onError={onError}
              />
            </Col>
          </Row>
        </Card>
      </Form>
    </Page>
  );
};
