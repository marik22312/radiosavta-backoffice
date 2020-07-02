import { inject, observer } from "mobx-react";
import React from "react";
import { RouteComponentProps } from "react-router-dom";
import IdentityStore from "../../../../stores/identity.store";
import ProgramsStore from "../../../../stores/programs.store";

import { Table, Button } from "reactstrap";
import { Page } from "../../../../components/Page/Page";
import { IProgram, ProgramUser } from "../../../../models/types";
import { AddUserToShowCard } from "../../../../components/AddUserToShow/AddUserToShow";
import { Tag, Col, Row, Card, Space } from "antd";
import { NoRecordedShows } from "../../../../components/EmptyState/NoRecordedShows";

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
    const programName = program?.name_en || "Single Program";
    return (
      <Page breadcrumbs={["Home", "Programs"]} title={programName}>
        {this.state.program && (
          <React.Fragment>
            <Col span={24}>
              <Card>
                <Space>
                  <div>{this.state.program && this.renderImage()}</div>
                  <div>
                    {this.renderInfoRow({
                      icon: "description",
                      title: "Description",
                      data: this.state.program?.description,
                    })}
                  </div>
                </Space>
              </Card>
            </Col>
            {/* Users */}
            <Space direction="vertical" style={{ width: "100%" }}>
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={24}>
                  <Card
                    title="Crew"
                    extra={
                      <Button
                        color="primary"
                        onClick={() => this.toggleAddCrewMember()}
                      >
                        Add User
                      </Button>
                    }
                  >
                    <div>
                      {this.state.isAddMemberOpen && this.renderAddMemberRow()}
                      <Row>
                        <Col span={24}>
                          <Space>
                            {this.state.program?.users.map((user) => {
                              return (
                                <Tag
                                  closable={allowRemovingUsers}
                                  onClose={() =>
                                    this.removeUserFromProgram(user.id)
                                  }
                                >
                                  {user.name}
                                </Tag>
                              );
                            })}
                          </Space>
                        </Col>
                      </Row>
                    </div>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Card title="Recorded Shows">
                    {/* <Card.Header>
                    <Row className="d-flex">
                      <Col span={18}>
                        <Card.Title title="Recorded shows" />
                      </Col>
                      <Col span={6}>
                        <Button color="primary" disabled>
                          Add show
                        </Button>
                      </Col>
                    </Row>
                  </Card.Header> */}
                    <div>
                      <Row>
                        <Col span={24}>
                          {this.state.program &&
                          this.state.program.recorded_shows.length ? (
                            this.renderRecordedShowsTable()
                          ) : (
                            <NoRecordedShows />
                          )}
                        </Col>
                      </Row>
                    </div>
                  </Card>
                </Col>
              </Row>
            </Space>
          </React.Fragment>
        )}
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

    return <NoRecordedShows />;
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
