import React from "react";
import { RouteComponentProps } from "react-router-dom";
import moment from "moment";
import { Steps, Row, Card, Col } from "antd";

import { Page } from "../../../../components/Page/Page";

import { InfoStep } from "./InfoStep/InfoStep";
import { SummaryStep } from "./SummaryStep/SummaryStep";
import UsersStore from "../../../../stores/users.store";
import { inject, observer } from "mobx-react";
import { IUser } from "../../../../models/types";
import { ProgramsService } from "../../../../services/programs.service";

const { Step } = Steps;

interface CreateProgramStepOption {
  title: string;
  description: string;
}
enum CreateProgramStepKeys {
  INFO = "INFO",
  SUMMARY = "SUMMARY",
}
type CreateProgramStep = Record<CreateProgramStepKeys, number>;

const stepsMap: CreateProgramStep = {
  [CreateProgramStepKeys.INFO]: 0,
  [CreateProgramStepKeys.SUMMARY]: 1,
};
interface CreateProgramPageProps extends RouteComponentProps {
  usersStore: UsersStore;
  programsService: ProgramsService;
}

interface CreateProgramPageState {
  currentStep: number;
  users: IUser[];
  form: any;
  imagePreview: string;
  isLoading: boolean;
}

@inject("usersStore", "programsService")
@observer
export class CreateProgramPage extends React.Component<
  CreateProgramPageProps,
  CreateProgramPageState
> {
  private steps: CreateProgramStepOption[];
  constructor(props: CreateProgramPageProps) {
    super(props);

    this.state = {
      currentStep: stepsMap[CreateProgramStepKeys.INFO],
      users: [],
      form: {},
      imagePreview: "",
      isLoading: false,
    };

    this.steps = [
      {
        title: "Program details",
        description: "General program info",
      },
      {
        title: "Summary",
        description: "Is everything right?",
      },
    ];

    this.init();
  }

  private async init() {
    await this.fetchAvailableUsers();
  }

  private async fetchAvailableUsers() {
    const users = await this.props.usersStore.fetchAllUsers();
    this.setState({
      users,
    });
  }

  private getUserObjFromIds(userIds: number[]) {
    return this.state.users.filter((u) => userIds.includes(u.id));
  }

  private onFormFinished(formValues: any) {
    const imagePreview = URL.createObjectURL(
      formValues.picture.file.originFileObj
    );
    this.setState({
      currentStep: stepsMap[CreateProgramStepKeys.SUMMARY],
      form: formValues,
      imagePreview,
    });
  }

  private renderBody() {
    const { currentStep, users } = this.state;

    switch (currentStep) {
      case stepsMap[CreateProgramStepKeys.INFO]:
        return (
          <InfoStep
            onChange={() => null}
            onFinished={(formValues) => this.onFormFinished(formValues)}
            crew={users}
          />
        );
      case stepsMap[CreateProgramStepKeys.SUMMARY]:
        return (
          <SummaryStep
            crew={this.getUserObjFromIds(this.state.form.crew)}
            picture={this.state.imagePreview}
            name={this.state.form.name}
            description={this.state.form.description}
            day_of_week={this.state.form.day_of_week}
            time={moment(this.state.form.program_times).format("HH:mm")}
            onSubmit={() => this.onSubmit()}
            isLoading={this.state.isLoading}
          />
        );
      default:
        return <div>Error Occurd!</div>;
    }
  }

  private async onSubmit() {
    const { form } = this.state;
    this.setState({
      isLoading: true,
    });

    const request = {
      program: {
        name: form.name,
        description: form.description,
      },
      cover_image: form.picture.file.originFileObj,
      users: form.crew,
      program_time: {
        day_of_week: form.day_of_week,
        start_time: moment(this.state.form.program_times).format("HH:mm"),
      },
    };

    const program = await this.props.programsService.createProgram(request);
    this.props.history.push(`/programs/${program.programId}`);
  }

  render() {
    const { currentStep } = this.state;
    return (
      <Page title="Create Program">
        <React.Fragment>
          <Row>
            <Col span={24}>
              <Card>
                <Steps current={currentStep}>
                  {this.steps.map((s) => (
                    <Step
                      key={s.title}
                      title={s.title}
                      description={s.description}
                    />
                  ))}
                </Steps>
              </Card>
            </Col>
          </Row>
        </React.Fragment>
        {this.renderBody()}
      </Page>
    );
  }
}
