import { inject, observer } from "mobx-react";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import * as Yup from "yup";
import IdentityStore from "../../../stores/identity.store";

import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
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
export class SettingsPage extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
	const initialValues: LoginFormValues = { email: '', password: '' };

    return (
      <Page>
		  <Page.Header>
			  <Page.Title
				  title='settings Page'
				  />
		  </Page.Header>
		  <Page.Content>
			  <Container>
				  <Row>
					  <Col xs={12}>
						  Hello Home Page!
					  </Col>
				  </Row>
			  </Container>
		  </Page.Content>
      </Page>
    );
  }
}

