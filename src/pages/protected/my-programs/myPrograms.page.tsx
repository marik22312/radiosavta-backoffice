import React from "react";
import { Col, Row } from "antd";
import { useAuth } from "../../../hooks/auth/useAuth";
import { ProgramTile } from "../../../components/ProgramTile/ProgramTile";
import { Page } from "../../../components/Page/Page";
import { User } from "../../../domain/Users";
import { NoPrograms } from "./components/EmptyState";
import { logPressOnProgram } from "../../../api/mixpanel.api";

const ProgramsPageContent: React.FC<{ programs: User["programs"] }> = (
  props
) => {
  const onPressProgram = (programId: string) => {
    logPressOnProgram({
      origin: "my_programs",
      programId: programId as string,
    });
  };
  if (props.programs?.length) {
    return (
      <>
        {props.programs.map((program) => {
          return (
            <Col span={8} key={program.id}>
              <ProgramTile
                {...program}
                onClick={() => onPressProgram(program.id as string)}
              />
            </Col>
          );
        })}
      </>
    );
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
