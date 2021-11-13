import React from "react";
import { Col, Row } from "antd";
import { useAuth } from "../../../hooks/auth/useAuth";
import { ProgramTile } from "../../../components/ProgramTile/ProgramTile";
import { Page } from "../../../components/Page/Page";
import { Card } from "../../../components/Card/Card";
import { User } from "../../../domain/Users";
import { NoPrograms } from "./components/EmptyState";

const ProgramsPageContent: React.FC<{ programs: User["programs"] }> = (
  props
) => {
  if (props.programs?.length) {
    props.programs.map((program) => {
      return (
        <Col span={8} key={program.id}>
          <ProgramTile {...program} />
        </Col>
      );
    });
  }

  return (
    <Col xs={24}>
      <NoPrograms />
    </Col>
  );
};

export const MyPrograms: React.FC = () => {
  const { user } = useAuth();
  return (
    <Page title="My Programs" breadcrumbs={["Home"]}>
      <Row>
        <ProgramsPageContent programs={user?.programs} />
      </Row>
    </Page>
  );
};
