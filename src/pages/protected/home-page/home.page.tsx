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

const announcments = [
  {
    date: "17.10.2020",
    content: "Added todays agenda",
  },
  {
    date: "05.10.2020",
    content: "Added Users list",
  },
  {
    date: "17.07.2020",
    content: "Added remove user from program",
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
    const { stats } = this.state;

    const isValidStats = Boolean(stats.stream_start);

    const options = {
      weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
    const date = new Intl.DateTimeFormat("en-GB", options).format(
      new Date(stats.stream_start || null)
    );
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
            {isValidStats ? (
              <StatCard
                title={"Listeners Peak"}
                body={this.state.stats.listener_peak}
                units={`Since ${date}`}
              />
            ) : (
              <StatCard title={"Stream Source"} body={"AutoDJ"} />
            )}
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
