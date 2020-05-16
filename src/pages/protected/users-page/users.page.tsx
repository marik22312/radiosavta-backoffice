import { inject, observer } from "mobx-react";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import IdentityStore from "../../../stores/identity.store";

import { Col, Container, Row } from "reactstrap";
import { Page } from "../../../components/Page/Page";
import { IUser } from '../../../models/types';
import UsersStore from '../../../stores/users.store';

interface Props extends RouteComponentProps {
  identityStore: IdentityStore;
  usersStore: UsersStore;
}

interface State {
	users: IUser[]
}

@inject("identityStore", "usersStore")
@observer
export class UsersPage extends React.Component<Props, State> {
  constructor(props: Props) {
	super(props);
	
	this.state = {
		users: []
	}
  }

  public async componentDidMount() {
	await this.getAllUsers();
  }

  public render() {

    return (
      <Page>
		  <Page.Header>
			  <Page.Title
				  title='users Page'
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

  private async getAllUsers() {
	  const users = await this.props.usersStore.fetchAllUsers();
	  this.setState({
		  users
	  })

  }
}

