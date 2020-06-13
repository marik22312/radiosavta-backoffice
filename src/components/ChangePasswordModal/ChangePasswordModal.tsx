import { Formik, FormikProps } from "formik";
import * as React from "react";
import {
  Alert,
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner
} from "reactstrap";
import { ValidatePasswordResponse } from '../../utils/identity.utils';

interface Props {
  isOpen: boolean;
  toggle: any;
  onSubmit(values: ChangeFormFields): Promise<any>;
}

interface ChangeFormFields {
	newPassword: string;
	passwordRepeat: string;
	oldPassword: string;
}

interface State {
	isLoading: boolean;
	error: ValidatePasswordResponse | null
}

export class ChangePasswordModal extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
		isLoading: false,
		error: null,
	};
  }

  public componentDidUpdate(prevProps: Props) {
	  if (this.props.isOpen && !prevProps.isOpen) {
		  this.setState({
			  isLoading: false,
			  error: null
		  })
	  }
  }

  public render() {
    const initialValues: ChangeFormFields = {
		newPassword: "",
		passwordRepeat: "",
		oldPassword: ""
	  };

    return (
      <Formik
        initialValues={initialValues}
        onSubmit={values => this.handleSubmit(values)}
        render={(values) => this.renderForm(values)}
      />
    );
  }

  private async handleSubmit(values: ChangeFormFields) {
	  this.setState({
		  isLoading: true
	  })
	  const response = await this.props.onSubmit(values);
	  if (response) {
		  return this.setState({
			  error: response,
			  isLoading: false
		  })
	  }
	  return this.setState({
		  error: null,
		  isLoading: false,
	  })
  }

  private renderAlert() {
	  return (
		<FormGroup row>
			<Col sm={12}>
				<Alert color="danger">Command failed with error {this.state.error}</Alert>
			</Col>
		</FormGroup>
	  )
  }

  private renderForm(formikProps: FormikProps<ChangeFormFields>) {
	const { isOpen, toggle } = this.props;
	const { isLoading } = this.state;
    return (
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Change Password</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup row>
              <Label for="oldPassword" sm={12}>
                Current password
              </Label>
              <Col sm={12}>
                <Input
				disabled={isLoading}
                  type="password"
                  name="oldPassword"
                  id="oldPassword"
                  placeholder="Current password"
                  onChange={formikProps.handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="newPassword" sm={12}>
                New password
              </Label>
              <Col sm={12}>
                <Input
				disabled={isLoading}
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  placeholder="New password"
                  onChange={formikProps.handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="passwordRepeat" sm={12}>
                Repeat new password
              </Label>
              <Col sm={12}>
                <Input
				disabled={isLoading}
                  type="password"
                  name="passwordRepeat"
                  id="passwordRepeat"
                  placeholder="Repeat new password"
                  onChange={formikProps.handleChange}
                />
              </Col>
            </FormGroup>
			{this.state.error && this.renderAlert()}
          </Form>
        </ModalBody>
        <ModalFooter>
		  {isLoading && <Spinner color="primary" />}
          <Button color={"secondary"} onClick={toggle} disabled={isLoading}>
            Cancel
          </Button>
          <Button color={"primary"} onClick={formikProps.handleSubmit} disabled={isLoading}>Change Password</Button>
        </ModalFooter>
      </Modal>
    );
  }
}
