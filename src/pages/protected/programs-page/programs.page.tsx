import { inject, observer } from "mobx-react";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import IdentityStore from "../../../stores/identity.store";

import { Col, Container, Row } from "reactstrap";
import { Page } from "../../../components/Page/Page";

interface Props extends RouteComponentProps {
  identityStore: IdentityStore;
}


@inject("identityStore")
@observer
export class ProgramsPage extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  public render() {

    return (
      <Page>
		  <Page.Header>
			  <Page.Title
				  title='programs Page'
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

