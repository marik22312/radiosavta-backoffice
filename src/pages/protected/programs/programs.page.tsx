import { inject, observer } from "mobx-react";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import IdentityStore from "../../../stores/identity.store";
import ProgramsStore from "../../../stores/programs.store";

import { Col, Container, Row, Table } from "reactstrap";
import { Page } from "../../../components/Page/Page";
import { IProgram } from "../../../models/types";
import { Card } from "../../../components/Card/Card";

interface Props extends RouteComponentProps {
  identityStore: IdentityStore;
  programsStore: ProgramsStore;
}

interface State {
  programs: IProgram[];
  isLoading: boolean;
}

@inject("identityStore", "programsStore")
@observer
export class ProgramsPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      programs: [],
      isLoading: true,
    };
  }

  public async componentDidMount() {
    await this.fetchPrograms();
  }

  private async fetchPrograms() {
    this.setState({
      isLoading: true,
    });
    const programs = await this.props.programsStore.fetchAll();
    this.setState({
      programs,
      isLoading: false,
    });
  }

  public render() {
    return (
      <Page title="Programs Page" breadcrumbs={["Home"]}>
        <Card>
          <Card.Content>
            <Table hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Users</th>
                </tr>
              </thead>
              <tbody>
                {this.state.programs.map((program) => {
                  return (
                    <tr
                      key={program.id}
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        this.props.history.push(`/programs/${program.id}`)
                      }
                    >
                      <th scope="row">{program.id}</th>
                      <td>{program.name_en}</td>
                      <td>{program.description}</td>
                      <td>
                        {program.users.map((user) => {
                          return (
                            <span key={`user-${user.id}`}>
                              {user.name},&nbsp;
                            </span>
                          );
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Card.Content>
        </Card>
      </Page>
    );
  }
}
