import { inject, observer } from "mobx-react";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import IdentityStore from "../../../stores/identity.store";
import ProgramsStore from "../../../stores/programs.store";

import { Table } from "antd";
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

const columns = [
  {
    title: "#",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name_en",
    key: "inamed",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
];

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
            <Table
              columns={columns}
              dataSource={this.state.programs}
              onRow={(record) => ({
                onClick: () => this.props.history.push(`programs/${record.id}`),
              })}
            />
          </Card.Content>
        </Card>
      </Page>
    );
  }
}
