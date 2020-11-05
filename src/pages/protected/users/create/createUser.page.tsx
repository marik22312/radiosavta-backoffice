import { inject, observer } from "mobx-react";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import * as Yup from "yup";

import IdentityStore from "../../../../stores/identity.store";

import {
  Alert,
  Form,
  Switch,
  Button,
  Upload,
  Input,
  Row,
  Col,
  Card,
} from "antd";

import { Page } from "../../../../components/Page/Page";
import { IUser } from "../../../../models/types";
import UsersStore from "../../../../stores/users.store";
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
      fileUrl: "",
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
      return this.props.history.push("/users");
    } catch (err) {
      this.setState({
        isLoading: false,
        error: err.message,
      });
    }
  }

  private onFileChanged(event: any) {
    this.setState({
      fileUrl: URL.createObjectURL(event.file),
      fileToUpload: event.file,
    });
  }

  private renderCreateUserForm() {
    return (
      <Row>
        <Col span={24}>
          <Form
            onFinish={(values: any) => this.onFormSubmit(values)}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
          >
            {this.state.fileUrl ? (
              <img
                src={this.state.fileUrl}
                alt="show preview"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            ) : (
              <Form.Item
                label="Profile Picture"
                name="profile_picture"
                rules={[
                  {
                    required: true,
                    message: "Profile picture is required!",
                  },
                ]}
              >
                <Upload.Dragger
                  listType="picture"
                  showUploadList={false}
                  accept="image/*"
                  customRequest={(e) => this.onFileChanged(e)}
                >
                  <p>Upload an image</p>
                </Upload.Dragger>
              </Form.Item>
            )}
            <Form.Item
              label="Full name"
              name="fullname"
              rules={[
                {
                  required: true,
                  message: "Full name is required!",
                },
                {
                  min: 3,
                  message: "User name must be atleast 3 characters long",
                },
              ]}
            >
              <Input id="fullname" placeholder="John Smith" />
            </Form.Item>
            <Form.Item
              label="Email Address"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Email is required!",
                },
              ]}
            >
              <Input
                type="email"
                placeholder="Johns@radiosavta.com"
                autoComplete="off"
              />
            </Form.Item>
            <Form.Item
              label="Location"
              name="location"
              rules={[
                {
                  required: true,
                  message: "Profile picture is required!",
                },
              ]}
            >
              <Input placeholder="Mitspe Ramon, Israel" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Profile picture is required!",
                },
              ]}
            >
              <Input
                placeholder="Password"
                autoComplete="off"
                type="password"
              />
            </Form.Item>
            <Form.Item label="Show on site?" name="showOnWebsite">
              <Switch />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={this.state.isLoading}
                disabled={this.state.isLoading}
              >
                Submit
              </Button>
            </Form.Item>
            {this.state.error && (
              <Alert type="error" message={this.state.error} />
            )}
          </Form>
        </Col>
      </Row>
    );
  }

  public render() {
    return (
      <Page breadcrumbs={["Users"]} title="Create User">
        <Form autoComplete="off">
          <Card>{this.renderCreateUserForm()}</Card>
        </Form>
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
