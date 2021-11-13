import React from "react";
import { Col, Row } from "antd";
import { useAuth } from "../../../hooks/auth/useAuth";
import { ProgramTile } from "../programs/program-tile/programTile";
import { Page } from "../../../components/Page/Page";
import { Card } from "../../../components/Card/Card";

export const MyPrograms: React.FC = () => {
  const { user } = useAuth();
  return (
    <Page title="My Programs" breadcrumbs={["Home"]}>
      <Card>
        <Card.Content>
          <Row>
            {user?.programs?.map((program) => {
              return (
                <Col span={8}>
                  <ProgramTile key={program.id} {...program} />
                </Col>
              )
            })}
          </Row>
        </Card.Content>
      </Card>
    </Page>
  );
};
