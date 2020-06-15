import { inject, observer } from "mobx-react";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import IdentityStore from "../../../../stores/identity.store";
import ProgramsStore from "../../../../stores/programs.store";

import { Col, Container, Row, Table, Button } from "reactstrap";
import { Page } from "../../../../components/Page/Page";
import { IProgram } from "../../../../models/types";
import { Card } from "../../../../components/Card/Card";

interface SingleProgramPageParams {
  id: string;
}
interface Props extends RouteComponentProps<SingleProgramPageParams> {
  identityStore: IdentityStore;
  programsStore: ProgramsStore;
}

interface State {
  program?: IProgram;
  isLoading: boolean;
}

@inject("identityStore", "programsStore")
@observer
export class SingleProgramPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  public async componentDidMount() {
    await this.fetchProgram();
  }

  private async fetchProgram() {
    this.setState({
      isLoading: true,
    });
    const program = await this.props.programsStore.fetchById(
      this.props.match.params.id
    );
    this.setState({
      program,
      isLoading: false,
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
  public render() {
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
                          <Button color="primary" disabled>
                            Add crew member
                          </Button>
                        </Col>
                      </Row>
                    </Card.Header>
                    <Card.Content>
                      <Row>
                        {this.state.program?.users.map((user) => {
                          return (
                            <Col xs={4}>
                              <div
                                onClick={() =>
                                  this.props.history.push(`/users/${user.id}`)
                                }
                              >
                                {user.name}
                              </div>
                            </Col>
                          );
                        })}
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
