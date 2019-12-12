import { Field,
	FieldProps,
	Form as FormikForm,
	Formik,
	FormikHelpers,
	FormikProps, } from "formik";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import * as Yup from "yup";
import IdentityStore from "../../stores/identity.store";

import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";

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
      <Container fluid>
        <Row className="justify-content-center align-items-center">
          <Col xs={4}>
            <Row>
              <Col xs={12}>
                <h1>Login</h1>
              </Col>
            </Row>
			Hello {this.props.identityStore.user.email}
          </Col>
        </Row>
      </Container>
    );
  }
}

