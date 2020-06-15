import { inject, observer } from "mobx-react";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import IdentityStore from "../../../stores/identity.store";

import Interval from "react-interval";

import { Col, Container, Row } from "reactstrap";
import { Page } from "../../../components/Page/Page";
import { StatCard } from "../../../components/StatCard/StatCart";
import BaseApiService from "../../../services/base.api.service";

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
        <Page.Header>
          <Container>
            <Row>
              <Col xs={12}>
                <Page.Title title="Radiosavta Dashboard" />
              </Col>
            </Row>
          </Container>
        </Page.Header>
        <Page.Content>
          <Container>
            <Row>
              <Col xs={4}>
                <StatCard
                  title="Live Listeners"
                  body={this.state.stats.listeners}
                />
              </Col>
              <Col xs={12} md={4}>
                <StatCard
                  title={"Listeners Peak"}
                  body={this.state.stats.listener_peak}
                  units={`Since ${date}`}
                />
              </Col>
              <Col xs={12} md={4}>
                <StatCard
                  interactive
                  title="Create User"
                  body="+"
                  onClick={() => this.props.history.push("/users/create")}
                ></StatCard>
              </Col>
            </Row>
          </Container>
        </Page.Content>
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
