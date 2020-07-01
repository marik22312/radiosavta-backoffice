import { inject, observer } from "mobx-react";
import React from "react";
import { RouteComponentProps } from "react-router-dom";
import IdentityStore from "../../../../stores/identity.store";
import ProgramsStore from "../../../../stores/programs.store";

import { Col, Container, Row, Table, Button } from "reactstrap";
import { Page } from "../../../../components/Page/Page";
import { IProgram, ProgramUser } from "../../../../models/types";
import { Card } from "../../../../components/Card/Card";
import { AddUserToShowCard } from "../../../../components/AddUserToShow/AddUserToShow";
import { Tag } from "../../../../components/Tag/Tag";

interface SingleProgramPageParams {
  id: string;
}
interface Props extends RouteComponentProps<SingleProgramPageParams> {
  identityStore: IdentityStore;
  programsStore: ProgramsStore;
}

enum ProgramsLoaderTypes {
  ADD_USER_TO_PROGRAM = "ADD_USER_TO_PROGRAM",
}
interface State {
  program?: IProgram;
  isLoading: boolean;
  loader: ProgramsLoaderTypes | null;
  availableUsers: ProgramUser[];
  isAddMemberOpen: boolean;
  selectedUserToAdd: number | null;
}

@inject("identityStore", "programsStore")
@observer
export class SingleProgramPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isLoading: true,
      availableUsers: [],
      isAddMemberOpen: false,
      selectedUserToAdd: null,
      loader: null,
    };
  }

  public async componentDidMount() {
    await this.initPage();
  }

  private async initPage() {
    this.setState({
      isLoading: true,
    });
    await this.fetchProgram();
    await this.fetchAvailableUsers();

    this.setState({
      isLoading: false,
    });
  }

  private async fetchAvailableUsers() {
    const { users } = await this.props.programsStore.getAvailableUsers(
      this.state.program!.id
    );

    return this.setState({
      availableUsers: users,
      isAddMemberOpen: false,
    });
  }

  private async fetchProgram() {
    const program = await this.props.programsStore.fetchById(
      this.props.match.params.id
    );
    this.setState({
      program,
    });
  }

  private renderInfoRow(props: { icon: string; title: string; data: string }) {
    return (
      <div className="d-flex">
        <div className="mr-1">{props.icon}</div>
        <div className="mr-1">{props.title}</div>
        <div className="mr-1">{props.data}</div>
      </div>
    );
  }
  private renderImage() {
    const { program } = this.state;
    const imageUrl = program?.cover_image || program?.users[0].profile_image;

    const imageStyle: React.CSSProperties = {
      width: "auto",
      maxHeight: "200px",
    };

    return (
      <img
        alt={program?.name_en}
        src={
          "https://res.cloudinary.com/marik-shnitman/image/upload/w_600/v1547932540/" +
          imageUrl
        }
        style={imageStyle}
      />
    );
  }

  private toggleAddCrewMember() {
    this.setState({
      isAddMemberOpen: !this.state.isAddMemberOpen,
    });
  }

  private renderAddMemberRow() {
    return (
      <Row>
        <AddUserToShowCard
          availableUsers={this.state.availableUsers}
          onCancel={() => {
            this.toggleAddCrewMember();
          }}
          onSave={(userId) => this.onSaveUserToShow(userId)}
        />
      </Row>
    );
  }

  private async onSaveUserToShow(userId: number) {
    console.log("OnSave", userId);
    await this.props.programsStore.addUserToShow(
      this.props.match.params.id,
      userId
    );

    await this.fetchAvailableUsers();
    await this.fetchProgram();
  }

  private removeUserFromProgram(id: number) {
    // TODO: Add remove user from program functionality
    console.log(`Removing user ${id}`);
  }

  public render() {
    const { program } = this.state;
    const allowRemovingUsers = !!program && program.users.length > 1;
    return (
      <Page>
        <Page.Header>
          <Container>
            <Row>
              <Col xs={12}>
                <Page.Title
                  title={this.state.program?.name_en || "programs Page"}
                />
              </Col>
            </Row>
          </Container>
        </Page.Header>
        <Page.Content>
          {this.state.program && (
            <Container>
              <Row>
                <Col xs={12}>
                  <Card>
                    <Card.Content>
                      <Row>
                        <Col xs={6}>
                          {this.state.program && this.renderImage()}
                        </Col>
                        <Col xs={6}>
                          {this.renderInfoRow({
                            icon: "description",
                            title: "Description",
                            data: this.state.program?.description,
                          })}
                        </Col>
                      </Row>
                    </Card.Content>
                  </Card>
                </Col>
              </Row>
              {/* Users */}
              <Row className="mt-3">
                <Col xs={12}>
                  <Card>
                    <Card.Header>
                      <Row className="d-flex">
                        <Col xs={9}>
                          <Card.Title title="Crew" />
                        </Col>
                        <Col xs={3}>
                          <Button
                            color="primary"
                            disabled={this.state.availableUsers?.length == 0}
                            onClick={(e: any) => this.toggleAddCrewMember()}
                          >
                            Add crew member
                          </Button>
                        </Col>
                      </Row>
                    </Card.Header>
                    <Card.Content>
                      {this.state.isAddMemberOpen && this.renderAddMemberRow()}
                      <Row>
                        <Col xs={12}>
                          {this.state.program?.users.map((user) => {
                            return (
                              <Tag
                                onClick={() =>
                                  this.props.history.push(`/users/${user.id}`)
                                }
                                removeable={allowRemovingUsers}
                                onRemove={() =>
                                  this.removeUserFromProgram(user.id)
                                }
                              >
                                {user.name}
                              </Tag>
                            );
                          })}
                        </Col>
                      </Row>
                    </Card.Content>
                  </Card>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col xs={12}>
                  <Card>
                    <Card.Header>
                      <Row className="d-flex">
                        <Col xs={9}>
                          <Card.Title title="Recorded shows" />
                        </Col>
                        <Col xs={3}>
                          <Button color="primary" disabled>
                            Add show
                          </Button>
                        </Col>
                      </Row>
                    </Card.Header>
                    <Card.Content>
                      <Row>
                        <Col xs={12}>
                          {this.state.program &&
                            this.renderRecordedShowsTable()}
                        </Col>
                      </Row>
                    </Card.Content>
                  </Card>
                </Col>
              </Row>
            </Container>
          )}
        </Page.Content>
      </Page>
    );
  }

  private renderRecordedShowContent() {
    const { program } = this.state;

    if (program?.recorded_shows.length) {
      return program?.recorded_shows.map((show) => {
        return (
          <tr key={show.id}>
            <th>{show.id}</th>
            <td>{show.name}</td>
            <td>{show.duration}</td>
            <td>{show.url}</td>
            <td>{show.is_displayed ? "Yes" : "No"}</td>
          </tr>
        );
      });
    }

    return <div>This program has no recorded shows</div>;
  }

  private renderRecordedShowsTable() {
    const { program } = this.state;

    return (
      <Table hover responsive>
        <thead>
          <th>#</th>
          <th>Title</th>
          <th>Duration</th>
          <th>Url</th>
          <th>Visible to listeners?</th>
        </thead>
        <tbody>{this.renderRecordedShowContent()}</tbody>
      </Table>
    );
  }
}

////////////////////////////////////
