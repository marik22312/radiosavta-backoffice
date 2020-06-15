import { inject, observer } from "mobx-react";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import * as Yup from "yup";

import IdentityStore from "../../../../stores/identity.store";

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
  Alert,
  CustomInput,
} from "reactstrap";
import { Page } from "../../../../components/Page/Page";
import { IUser } from "../../../../models/types";
import UsersStore from "../../../../stores/users.store";
import { Card } from "../../../../components/Card/Card";
import { Formik, FormikProps } from "formik";
import { CreateUserRequest } from "../../../../services/users.service";

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
export class CreateUserPage extends React.Component<Props, State> {
  private schema: Yup.ObjectSchema;
  constructor(props: Props) {
    super(props);

    this.schema = Yup.object().shape({
      fullname: Yup.string().required(),
      email: Yup.string().required(),
      location: Yup.string().required(),
      showOnWebsite: Yup.array(),
      password: Yup.string().required(),
      profile_picture: Yup.string().required(),
    });

    this.state = {
      users: [],
      fileUrl: "https://via.placeholder.com/500",
      fileToUpload: null,
      isLoading: false,
      error: null,
    };
  }

  public async componentDidMount() {
    await this.getAllUsers();
  }

  private async onFormSubmit(values: CreateUserRequest) {
    this.setState({
      isLoading: true,
      error: null,
    });
    const { fileToUpload } = this.state;
    const newValues: CreateUserRequest = {
      ...values,
      profile_picture: fileToUpload,
    };
    try {
      await this.props.usersStore.createUser(newValues);
      return this.setState({
        isLoading: false,
        error: null,
      });
    } catch (err) {
      this.setState({
        isLoading: false,
        error: err.message,
      });
    }
  }

  private onFileChanged(event: any) {
    this.setState({
      fileUrl: URL.createObjectURL(event.target.files[0]),
      fileToUpload: event.target.files[0],
    });
  }

  private renderCreateUserForm(props: FormikProps<any>) {
    return (
      <>
        <Row>
          <Col xs={12}>
            <div
              className="form-image-container"
              style={{
                height: "200px",
              }}
            >
              {this.state.fileUrl && (
                <img
                  src={this.state.fileUrl}
                  style={{
                    width: "auto",
                    height: "100%",
                  }}
                  alt="to upload"
                />
              )}
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <FormGroup>
              <Label>Profile picture</Label>
              <Input
                type="file"
                accept="image/jpeg image/png"
                name="profile_picture"
                onChange={(e) => {
                  this.onFileChanged(e);
                  props.handleChange(e);
                }}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
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
        </Row>
        <Row>
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
                placeholder="Mitspe Ramon, Israel"
                onChange={props.handleChange}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
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
              <CustomInput
                id="showOnWebsite"
                label="Show on listeners website?"
                type="switch"
                onClick={props.handleChange}
                name="showOnWebsite"
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Button
              color="primary"
              onClick={props.handleSubmit}
              disabled={this.state.isLoading}
            >
              Submit
            </Button>
            {this.state.isLoading && <Spinner color="primary" />}
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={12}>
            {this.state.error && (
              <Alert color="danger">{this.state.error}</Alert>
            )}
          </Col>
        </Row>
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
                  <Formik
                    initialValues={{
                      fullname: "",
                      password: "",
                      email: "",
                      location: "",
                      profile_picture: "",
                    }}
                    render={(props) => this.renderCreateUserForm(props)}
                    onSubmit={(values: CreateUserRequest) =>
                      this.onFormSubmit(values)
                    }
                    // validationSchema={this.schema}
                  />
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
      users,
    });
  }
}
