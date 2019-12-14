import * as React from "react";
import { observer, inject } from "mobx-react";
import { RouteComponentProps } from "react-router-dom";
import IdentityStore from "../../stores/identity.store";
import { Formik,
	FormikHelpers,
	FormikProps,
	Form as FormikForm,
	Field,
	FieldProps, } from "formik";
import * as Yup from "yup";

import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";

interface Props extends RouteComponentProps {
  identityStore: IdentityStore;
}

interface LoginFormValues {
	email: string;
	password: string;
  }

@inject("identityStore")
@observer
export class LoginPage extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  render() {
	const initialValues: LoginFormValues = { email: '', password: '' };

    return (
      <Container fluid>
        <Row className="justify-content-center align-items-center">
          <Col xs={4}>
            <Row>
              <Col xs={12}>
                <h1>Login</h1>
              </Col>
            </Row>
			<Formik
				initialValues={initialValues}
				onSubmit={this.onFormSubmit}
				render={this.renderForm}
				/>
          </Col>
        </Row>
      </Container>
    );
  }

  onFormSubmit = async (values: LoginFormValues) => {
	  try {
		  await this.props.identityStore.preformLogin(values);
		  this.props.history.push('/')
	  } catch (error) {
		  console.log('ERR')
	  }
  }

  private renderForm(formikProps: FormikProps<LoginFormValues>) {
	  console.log('env', process.env)
    return (
      <Form>
        <FormGroup row>
          <Label for="userEmail" sm={12}>
            Email
          </Label>
          <Col sm={12}>
            <Input
              type="email"
              name="email"
              id="userEmail"
			  placeholder="user@radiosavta.com"
			  onChange={formikProps.handleChange}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="userPassword" sm={12}>
            Password
          </Label>
          <Col sm={12}>
            <Input
              type="password"
              name="password"
              id="userPassword"
			  placeholder="user@radiosavta.com"
			  onChange={formikProps.handleChange}
            />
          </Col>
        </FormGroup>
		<FormGroup row>
        <Col sm={12}>
          <Button color={'primary'} onClick={formikProps.submitForm}>Submit</Button>
        </Col>
      </FormGroup>
      </Form>
    );
  }
}
