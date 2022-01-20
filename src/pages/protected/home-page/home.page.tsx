import * as React from "react";
import { inject, observer } from "mobx-react";
import { RouteComponentProps } from "react-router-dom";
import IdentityStore from "../../../stores/identity.store";

import Interval from "react-interval";

import { Col, Row, Card, List, Typography } from "antd";
import { Page } from "../../../components/Page/Page";
import { StatCard } from "../../../components/StatCard/StatCart";
import BaseApiService from "../../../services/base.api.service";
import { Schedule } from "../../../components/Schedule/Schedule";
import { ListenerStatistics } from "../../../components/ListenerStatistics/ListenerStatistics";

const announcments = [
  {
    date: "20.01.2022",
    content: "Added Live player statistics view",
  },
  {
    date: "14.01.2022",
    content: "Added Delete recorded show",
  },
  {
    date: "11.01.2022",
    content: "Added Edit recorded show",
  },
];

interface Props extends RouteComponentProps {
  identityStore: IdentityStore;
  apiStore: BaseApiService;
}

interface State {
  stats: any;
}

@inject("identityStore", "apiStore")
@observer
export class HomePage extends React.Component<Props, State> {
  private DEFAULT_INTERVAL_MS = 30000;
  constructor(props: Props) {
    super(props);

    this.state = {
      stats: {},
    };
  }

  public componentDidMount() {
    this.fetchStats();
  }

  public render() {
    return (
      <Page>
        <Row>
          <Col span={24}>
            <Card title="Whats new?">
              <List
                bordered
                dataSource={announcments}
                renderItem={(item) => (
                  <List.Item>
                    <Typography.Text mark>[{item.date}]</Typography.Text>
                    {" - "}
                    {item.content}
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
        <Row
          style={{
            marginTop: 15,
          }}
        >
          <Col span={24}>
            <Card title="Live play statistics">
              <ListenerStatistics />
            </Card>
          </Col>
        </Row>
        <Row
          style={{
            marginTop: 15,
          }}
        >
          <Col span={24}>
            <Card title="Today's Agenda">
              <Schedule />
            </Card>
          </Col>
        </Row>
        <Row
          justify="space-between"
          style={{
            marginTop: 15,
          }}
        >
          <Col span={7}>
            <StatCard
              title="Live Listeners"
              body={this.state.stats.listeners}
            />
          </Col>
          <Col span={7}>
            <StatCard
              title={"Stream Source"}
              units={this.state.stats.streamer}
              body={this.state.stats.isLive && "LIVE!"}
            />
          </Col>
          <Col span={7}>
            <StatCard
              interactive
              title="Create User"
              body="+"
              onClick={() => this.props.history.push("/users/create")}
            ></StatCard>
          </Col>
        </Row>
        <Row
          justify="space-between"
          style={{
            marginTop: "15px",
          }}
        >
          <Col span={7}>
            <StatCard
              interactive
              title="Create Program"
              body="+"
              onClick={() => this.props.history.push("/programs/create")}
            ></StatCard>
          </Col>
        </Row>
        <Interval
          callback={() => this.fetchStats()}
          enabled={true}
          timeout={this.DEFAULT_INTERVAL_MS}
        />
      </Page>
    );
  }

  private readonly fetchStats = async () => {
    // TODO: Move logic to stats store
    const { apiStore } = this.props;

    try {
      const { data } = await apiStore.get("/statistics/server");

      this.setState({
        stats: data,
      });
    } catch (error) {
      // TODO: Add notifications module to support HTTP errors
    }
  };
}
