import * as React from "react";
import { inject, observer } from "mobx-react";
import { RouteComponentProps } from "react-router-dom";
import IdentityStore from "../../../stores/identity.store";

import Interval from "react-interval";

import { Col, Row, Card, List, Typography, Empty, Result } from "antd";
import { Page } from "../../../components/Page/Page";
import { StatCard } from "../../../components/StatCard/StatCart";
import BaseApiService from "../../../services/base.api.service";
import { Schedule } from "../../../components/Schedule/Schedule";
import { Line } from '@ant-design/plots';
import { httpClient } from "../../../services/http.client";

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
  statistics: any;
}

interface lineChartItem {
  'date': string;
  'value': number;
  'broadcaster': string;
}

interface ResponseDataObject {
  [key:string]: number
}

interface ResponseData {
  [key:string]: ResponseDataObject
}

interface Response {
  data: {
    response: { 
      data: ResponseData
    }
  }
}

function mapResponseToChart(item: ResponseData): lineChartItem[] {
  const options = {
    month: "numeric",
    day: "numeric",
  };
  const arr:lineChartItem[] = []
  const items = Object.keys(item).forEach((broadcaster) => {
    Object.keys(item[broadcaster]).forEach(date => {
        arr.push({
          broadcaster,
          value: item[broadcaster][date],
          date:  new Intl.DateTimeFormat("en-GB", options).format(
            new Date(date)
          )
        })
    })
  })
  return arr
}

@inject("identityStore", "apiStore")
@observer
export class HomePage extends React.Component<Props, State> {
  private DEFAULT_INTERVAL_MS = 30000;
  constructor(props: Props) {
    super(props);

    this.state = {
      stats: {},
      statistics: [],
    };
  }

  public componentDidMount() {
    this.fetchStats();
    this.fetchStatistics();
  }

  public render() {
    const { stats, statistics } = this.state;

    const options = {
      weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
    const date = new Intl.DateTimeFormat("en-GB", options).format(
      new Date(stats.stream_start || null)
    );

    console.log(statistics)

    const config = {
      data: statistics,
      xField: 'date',
      yField: 'value',
      seriesField: 'broadcaster',
      color: ['#7856FF', '#FF7557', '#80E1D9', '#F8BC3B', '#B2596E', '#72BEF4'],
    };


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
            <Card title="statistics?">
                {statistics?.length ? <Line {...config} /> :(
                <Result
                  status="error"
                  title="Something went wrong"
                />)}
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
        stats: data
      });
    } catch (error) {
      // TODO: Add notifications module to support HTTP errors
    }
  };

  private readonly fetchStatistics = async () => {

    const statistics:Response = await httpClient.get("/v2/statistics/live-player/play");

    const statisticsData = mapResponseToChart(statistics.data.response.data)

    this.setState({
      statistics: statisticsData
    })
  }
}
