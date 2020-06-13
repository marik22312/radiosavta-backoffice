import { Formik, FormikProps } from "formik";
import * as React from "react";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from "reactstrap";

interface Props {
  isOpen: boolean;
  toggle: any;
}

interface ResetFormFields {
	newPassword: string;
	passwordRepeat: string;
	oldPassword: string;
  }

interface State {
  isLoading: boolean
}

export class ResetPasswordModal extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
		isLoading: false
	};
  }

  public render() {
    const initialValues: ResetFormFields = {
		newPassword: "",
		passwordRepeat: "",
		oldPassword: ""
	  };

    return (
      <Formik
        initialValues={initialValues}
        onSubmit={this.onFormSubmit}
        render={(values) => this.renderForm(values)}
      />
    );
  }

  public onFormSubmit = async (values: ResetFormFields) => {
    try {
		console.log('SUCC')
      // TODO: implement identity store functionallity here
    } catch (error) {
		// TODO: implement error toast here
      console.log("ERR");
    }
  };

  private renderForm(formikProps: FormikProps<ResetFormFields>) {
    const { isOpen, toggle } = this.props;
    return (
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Reset Password</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup row>
              <Label for="oldPassword" sm={12}>
                Current password
              </Label>
              <Col sm={12}>
                <Input
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
                  type="password"
                  name="passwordRepeat"
                  id="passwordRepeat"
                  placeholder="Repeat new password"
                  onChange={formikProps.handleChange}
                />
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color={"secondary"} onClick={toggle}>
            Cancel
          </Button>
          <Button color={"primary"} onClick={formikProps.handleSubmit}>Change Password</Button>
        </ModalFooter>
      </Modal>
    );
  }
}
