import { inject, observer } from "mobx-react";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import IdentityStore from "../../../stores/identity.store";

import { Col, Container, Row } from "reactstrap";
import { Card } from "../../../components/Card/Card";
import { Page } from "../../../components/Page/Page";

interface Props extends RouteComponentProps {
  identityStore: IdentityStore;
}

interface LoginFormValues {
	email: string;
	password: string;
  }

@inject("identityStore")
@observer
export class HomePage extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
	const initialValues: LoginFormValues = { email: '', password: '' };

    return (
      <Page>
		  <Page.Header>
			  <Page.Title
				  title='Home Page'
				  />
		  </Page.Header>
		  <Page.Content>
			  <Container fluid>
				  <Row>
					  <Col xs={6}>
						  <Card>
							  <Card.Header>
								  <Card.Title title="Server stats"/>
							  </Card.Header>
							  <Card.Content>
								  <Container>
									  <Row>
										  <Col xs={6}>some stat</Col>
										  <Col xs={6}>some stat</Col>
									  </Row>
								  </Container>
							  </Card.Content>
						  </Card>
					  </Col>
				  </Row>
			  </Container>
		  </Page.Content>
      </Page>
    );
  }
}

