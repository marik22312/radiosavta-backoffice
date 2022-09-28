import * as React from "react";
import { inject, observer } from "mobx-react";
import { RouteComponentProps } from "react-router-dom";
import IdentityStore from "../../../stores/identity.store";

import Interval from "react-interval";

import { Col, Row, Card, List, Typography, Descriptions } from "antd";
import { Page } from "../../../components/Page/Page";
import { StatCard } from "../../../components/StatCard/StatCart";
import BaseApiService from "../../../services/base.api.service";
import { Schedule } from "../../../components/Schedule/Schedule";
import { ListenerStatistics } from "../../../components/ListenerStatistics/ListenerStatistics";
import { UserBroadcastDetailsCard } from "../../../components/UserBroadcastDetailsCard";

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
  public render() {
    return (
      <Page>
        <Row
          style={{
            marginTop: 15,
          }}
        >
          <Col span={24}>
            <UserBroadcastDetailsCard />
          </Col>
        </Row>
        <Row
          style={{
            marginTop: 15,
          }}
        >
          <Col span={24}>
            <Card title="My Statistics">
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
      </Page>
    );
  }
}
