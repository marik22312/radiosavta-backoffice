import * as React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { Layout } from "antd";

import { inject, observer } from "mobx-react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { SideNav } from "./components/Navbar/SideNav";
import { NavigationBar } from "./components/Navbar/NavigationBar";
import { LoginPage } from "./pages/login-page/login.page";
import { HomePage } from "./pages/protected/home-page/home.page";
import { ProgramsPage } from "./pages/protected/programs/programs.page";
import { SingleProgramPage } from "./pages/protected/programs/singleProgram/singleProgram.page";
import { CreateUserPage } from "./pages/protected/users/create/createUser.page";
import IdentityStore from "./stores/identity.store";
import { CreateProgramPage } from "./pages/protected/programs/create-program/CreateProgram";
import { UsersPage } from "./pages/protected/users/Users.page";
import { SingleUserPage } from "./pages/protected/users/SingleUser/SingleUser.page";
import { UploadedRecordedShowPage } from "./pages/protected/programs/singleProgram/UploadRecordedShow/UploadedRecordedShowPage";
import { ResetPasswordPage } from "./pages/reset-password/ResetPassword.page";
import { ForgotPasswordPage } from "./pages/forgot-password/ForgotPassword.page";

const ProtectedRoute: React.FC<{ isLoggedIn: boolean }> = (props) => {
  const { isLoggedIn } = props;

  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideNav />
      <Layout style={{ marginLeft: 200 }}>
        <NavigationBar />
        <Layout.Content style={{ padding: "0 50px", marginTop: 64 }}>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/programs" exact component={ProgramsPage} />
            <Route
              path="/programs/create"
              exact
              component={CreateProgramPage}
            />
            <Route path="/programs/:id" exact component={SingleProgramPage} />
            <Route
              path="/programs/:programId/upload-show"
              exact
              component={UploadedRecordedShowPage}
            />
            <Route path="/users" exact component={UsersPage} />
            <Route path="/users/create" exact component={CreateUserPage} />
            <Route path="/users/:userId" exact component={SingleUserPage} />
            <Route component={() => <Redirect to="/" />} />
          </Switch>
        </Layout.Content>
      </Layout>
      <ToastContainer />
    </Layout>
  );
};

interface Props {
  identityStore?: IdentityStore;
}

@inject("identityStore")
@observer
export default class Routes extends React.Component<
  Props,
  Record<string, unknown>
> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }
  public render() {
    const { identityStore } = this.props;

    const isLoggedIn = identityStore!.isLoggedIn;

    return (
      <Router>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/forgot-password" component={ForgotPasswordPage} />
          <Route path="/reset-password" component={ResetPasswordPage} />
          <Route component={() => <ProtectedRoute isLoggedIn={isLoggedIn} />} />
        </Switch>
      </Router>
    );
  }
}
