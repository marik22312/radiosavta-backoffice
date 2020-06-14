import { inject, observer } from "mobx-react";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import IdentityStore from "../../../stores/identity.store";

import {
  Col,
  Container,
  Row,
  FormGroup,
  Label,
  Input,
  Form,
  Button,
  Spinner,
  Alert
} from "reactstrap";
import { Page } from "../../../components/Page/Page";
import { IUser } from "../../../models/types";
import UsersStore from "../../../stores/users.store";
import { Card } from "../../../components/Card/Card";
import { Formik, FormikProps } from "formik";

interface Props extends RouteComponentProps {
  identityStore: IdentityStore;
  usersStore: UsersStore;
}

interface State {
  isLoading: boolean;
  error: string | null;
  users: IUser[];
  fileToUpload: any;
  fileUrl: string;
}

@inject("identityStore", "usersStore")
@observer
export class UsersPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      users: [],
      fileUrl: "",
	  fileToUpload: null,
	  isLoading: false,
	  error: null
    };
  }

  public async componentDidMount() {
    await this.getAllUsers();
  }

  private async onFormSubmit(values: any) {
	  this.setState({
		  isLoading: true,
		  error: null,
	  })
    const { fileToUpload } = this.state;
    const newValues = {
      ...values,
      profile_picture: fileToUpload
    };
    try {
	  await this.props.usersStore.createUser(newValues);
	  return this.setState({
		isLoading: false,
		error: null,
	  })
    } catch (err) {
      this.setState({
		  isLoading: false,
		  error: err.message
	  })
    }
  }

  private onFileChanged(event: any) {
    this.setState({
      fileUrl: URL.createObjectURL(event.target.files[0]),
      fileToUpload: event.target.files[0]
    });
  }

  private renderCreateUserForm(props: FormikProps<any>) {
    return (
      <>
        <Col xs={6}>
          <img src={this.state.fileUrl} />
          <FormGroup>
            <Label>Full name</Label>
            <Input
              type="text"
              name="fullname"
              id="fullname"
              placeholder="John Smith"
              onChange={props.handleChange}
            />
          </FormGroup>
        </Col>
        <Col xs={6}>
          <FormGroup>
            <Label>Profile picture</Label>
            <Input
              type="file"
              accept="image/jpeg image/png"
              name="profile_picture"
              onChange={e => {
                this.onFileChanged(e);
                props.handleChange(e);
              }}
            />
          </FormGroup>
        </Col>
        <Col xs={6}>
          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="Johns@radiosavta.com"
              autoComplete="off"
              onChange={props.handleChange}
            />
          </FormGroup>
        </Col>
        <Col xs={6}>
          <FormGroup>
            <Label>Location</Label>
            <Input
              type="text"
              name="location"
              placeholder="Mitse Ramon, Israel"
              onChange={props.handleChange}
            />
          </FormGroup>
        </Col>
        <Col xs={6}>
          <FormGroup>
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Password"
              autoComplete="off"
              onChange={props.handleChange}
              name="password"
            />
          </FormGroup>
        </Col>
        <Col xs={6}>
          <FormGroup>
            <Label>Show on broadcasters page?</Label>
            <Input
              type="checkbox"
              onChange={props.handleChange}
              name="showOnWebsite"
            />
          </FormGroup>
        </Col>
        <Col xs={12}>
			{this.state.isLoading && <Spinner color="primary"/>}
          <Button color="primary" onClick={props.handleSubmit} disabled={this.state.isLoading}>
            Submit
          </Button>
		  {this.state.error && <Alert color="danger">{this.state.error}</Alert>}
        </Col>
      </>
    );
  }

  public render() {
    return (
      <Page>
        <Page.Header>
          <Container>
            <Row>
              <Col xs={12}>
                <Page.Title title="create user" />
              </Col>
            </Row>
          </Container>
        </Page.Header>
        <Page.Content>
          <Form autoComplete="off">
            <Container>
              <Card>
                <Card.Content>
                  <Row>
                    <Formik
                      initialValues={{}}
                      render={props => this.renderCreateUserForm(props)}
                      onSubmit={values => this.onFormSubmit(values)}
                    />
                  </Row>
                </Card.Content>
              </Card>
            </Container>
          </Form>
        </Page.Content>
      </Page>
    );
  }

  private async getAllUsers() {
    const users = await this.props.usersStore.fetchAllUsers();
    this.setState({
      users
    });
  }
}
