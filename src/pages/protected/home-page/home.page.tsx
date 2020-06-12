import { inject, observer } from "mobx-react";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import IdentityStore from "../../../stores/identity.store";

import { Col, Container, Row } from "reactstrap";
import { Card } from "../../../components/Card/Card";
import { Page } from "../../../components/Page/Page";
import { StatCard } from "../../../components/StatCard/StatCart";
import BaseApiService from '../../../services/base.api.service';

interface Props extends RouteComponentProps {
  identityStore: IdentityStore;
  apiStore: BaseApiService;
}

interface State {
  stats: any;
}

interface LoginFormValues {
  email: string;
  password: string;
}

@inject("identityStore", "apiStore")
@observer
export class HomePage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      stats: {}
    };
  }

  public componentDidMount() {
    this.fetchStats();
  }

  public render() {
const { stats } = this.state;
const options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' }
const date = new Intl.DateTimeFormat('en-GB', options).format(new Date(stats.stream_start || null));
    return (
      <Page>
        <Page.Header>
          <Page.Title title="Home Page" />
        </Page.Header>
        <Page.Content>
          <Container fluid>
            <Row>
              <Col xs={4}>
                <StatCard
                  title="Live Listeners"
				  body={this.state.stats.listeners}
                />
              </Col>
              <Col xs={12} md={4}>
                <StatCard title={"Listeners Peak"} body={this.state.stats.listener_peak} units={`Since ${date}`} />
              </Col>
			  <Col xs={12} md={4}>
				  <StatCard interactive title="Create User" body="+"
				  	onClick={() => alert('Coming soon!')}
				  >

				  </StatCard>
			  </Col>
			</Row>
          </Container>
        </Page.Content>
      </Page>
    );
  }

  private readonly fetchStats = async () => {
	  // TODO: Move logic to stats store
	  const { apiStore } = this.props;

	try {
		const { data } = await apiStore.get('/statistics/server');
		console.log(data)
    this.setState({
      stats: data
    });
	} catch (error) {
		
	}
  };
}
