import { inject, observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import ProgramsStore from "../../../../stores/programs.store";

import { Page } from "../../../../components/Page/Page";
import { ProgramUser, IFullProgram } from "../../../../models/types";
import { AddUserToShowCard } from "../../../../components/AddUserToShow/AddUserToShow";
import { Tag, Col, Row, Card, Space, Button, Descriptions } from "antd";
import {
  ValidateRecordedShowResponse,
  ProgramsService,
} from "../../../../services/programs.service";

import moment from "moment";
import { EditProgramTimes } from "../../../../components/EditProgramTimes/EditProgramTimes";
import { getProgramById } from "../../../../api/Programs.api";

import { RecordedShowsTable } from "./components/RecordedShows";
import { EditImageModal } from "../../../../components/EditImageImageModal/EditImageImageModal";
import { useUpdateProgramImage } from "./hooks/useUpdateProgramImage";

interface SingleProgramPageParams {
  id: string;
}
interface Props extends RouteComponentProps<SingleProgramPageParams> {
  programsStore: ProgramsStore;
  programsService: ProgramsService;
}

enum ProgramsLoaderTypes {
  ADD_USER_TO_PROGRAM = "ADD_USER_TO_PROGRAM",
  ADD_RECORDED_SHOW = "ADD_RECORDED_SHOW",
  REMOVE_USER_FROMM_SHOW = "REMOVE_USER_FROMM_SHOW",
}

enum SingeProgramPageModals {
  EDIT_TIMES = "EDIT_TIMES",
  EDIT_IMAGE = "EDIT_IMAGE",
}

enum AddRecordedShowStatuses {
  VALIDATE = "VALIDATE",
  SUBMIT = "SUBMIT",
}
interface State {
  program?: IFullProgram;
  isLoading: boolean;
  loader: ProgramsLoaderTypes | null;
  availableUsers: ProgramUser[];
  isAddMemberOpen: boolean;
  AddRecordedShowStatus: AddRecordedShowStatuses | null;
  selectedUserToAdd: number | null;
  verifiedRecordedShow: ValidateRecordedShowResponse | null;
  openModal: SingeProgramPageModals | null;
}

const columns = [
  {
    title: "#",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Title",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Duration",
    dataIndex: "duration",
    key: "duration",
  },
  {
    title: "Url",
    dataIndex: "url",
    key: "url",
  },
  {
    title: "Visible to listeners?",
    dataIndex: "is_displayed",
    key: "is_displayed",
  },
];

@inject("programsStore", "programsService")
@observer
export class SingleProgramPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isLoading: true,
      availableUsers: [],
      isAddMemberOpen: false,
      AddRecordedShowStatus: null,
      selectedUserToAdd: null,
      loader: null,
      verifiedRecordedShow: null,
      openModal: null,
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
    const program = await getProgramById(this.props.match.params.id);
    this.setState({
      program,
    });
  }

  private renderInfoRow(props: { icon: string; title: string; data: string }) {
    return (
      <Descriptions.Item label={props.title}>{props.data}</Descriptions.Item>
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
      <div>
        <img
          alt={program?.name_en}
          src={
            "https://res.cloudinary.com/marik-shnitman/image/upload/w_600/v1547932540/" +
            imageUrl
          }
          style={imageStyle}
        />
        <Button
          onClick={() =>
            this.setState({ openModal: SingeProgramPageModals.EDIT_IMAGE })
          }
        >
          Change image
        </Button>
      </div>
    );
  }

  private toggleAddCrewMember() {
    this.setState({
      isAddMemberOpen: !this.state.isAddMemberOpen,
    });
  }
  private toggleEditTimeModal() {
    this.setState({
      openModal:
        this.state.openModal === SingeProgramPageModals.EDIT_TIMES
          ? null
          : SingeProgramPageModals.EDIT_TIMES,
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
    await this.props.programsStore.addUserToShow(
      this.props.match.params.id,
      userId
    );

    await this.fetchAvailableUsers();
    await this.fetchProgram();
  }

  private async removeUserFromProgram(id: number) {
    this.setState({
      loader: ProgramsLoaderTypes.REMOVE_USER_FROMM_SHOW,
    });
    await this.props.programsService.removeUserToShow(
      this.state.program!.id,
      id
    );
    this.fetchProgram();
    this.setState({
      loader: null,
    });
  }

  public render() {
    const { program, loader } = this.state;
    const allowRemovingUsers =
      !!program &&
      program.users.length > 1 &&
      loader !== ProgramsLoaderTypes.REMOVE_USER_FROMM_SHOW;
    const programName = program?.name_en || "Single Program";
    return (
      <Page breadcrumbs={["Home", "Programs"]} title={programName}>
        {this.state.program && (
          <React.Fragment>
            <Col span={24}>
              <Card>
                <Space>
                  <div>{this.state.program && this.renderImage()}</div>
                  <Descriptions layout="horizontal">
                    {this.renderInfoRow({
                      icon: "description",
                      title: "When",
                      data: `${new Intl.DateTimeFormat("en", {
                        weekday: "short",
                      }).format(
                        moment()
                          .weekday(
                            this.state.program?.programTimes[0].day_of_week
                          )
                          .toDate()
                      )} - ${this.state.program?.programTimes[0].start_time}`,
                    })}
                  </Descriptions>
                  <div>
                    <Button
                      type="primary"
                      onClick={() => this.toggleEditTimeModal()}
                    >
                      Edit time
                    </Button>
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
                        type="primary"
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
                  <Card
                    title="Recorded Shows"
                    extra={
                      <Button
                        type="primary"
                        onClick={() =>
                          this.props.history.push(
                            `/programs/${this.props.match.params.id}/upload-show`
                          )
                        }
                      >
                        Add Recorded Show
                      </Button>
                    }
                  >
                    <div>
                      <Row>
                        <Col span={24}>
                          <RecordedShowsTable
                            programId={this.props.match.params.id}
                          />
                        </Col>
                      </Row>
                    </div>
                  </Card>
                </Col>
              </Row>
            </Space>
          </React.Fragment>
        )}
        <EditProgramTimes
          programId={program?.id}
          isOpen={this.state.openModal === SingeProgramPageModals.EDIT_TIMES}
          dayOfWeek={program?.programTimes.day_of_week}
          startTime={program?.programTimes.start_time}
          onClose={() => this.toggleEditTimeModal()}
        />
        <WrappedEditImageModal
          programId={this.props.match.params.id}
          isOpen={this.state.openModal === SingeProgramPageModals.EDIT_IMAGE}
          onCancel={() => this.setState({ openModal: null })}
          onImageUpdated={() => {
            this.setState({ openModal: null });
            this.fetchProgram();
          }}
        />
      </Page>
    );
  }
}

const WrappedEditImageModal: React.FC<{
  programId: string | number;
  isOpen: boolean;
  onCancel: () => void;
  onImageUpdated: () => void;
}> = (props) => {
  const onSuccess = () => {
    props.onImageUpdated();
  };
  const [errorMessage, setErrorMessage] = useState<string>();
  const { updateImage, isLoading } = useUpdateProgramImage(props.programId, {
    onError: (err) =>
      setErrorMessage("Something went wrong, please refresh and try again"),
    onSuccess,
  });
  const uploadImage = async (image: File) => {
    await updateImage(image);
  };

  useEffect(() => {
    if (props.isOpen) {
      setErrorMessage(undefined);
    }
  }, [props.isOpen]);
  return (
    <EditImageModal
      isOpen={props.isOpen}
      onCancel={props.onCancel}
      onOk={uploadImage}
      isLoading={isLoading}
      errorMessage={errorMessage}
    />
  );
};
