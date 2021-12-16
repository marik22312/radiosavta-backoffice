import React, { useMemo, ReactElement } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  RouteProps,
  Switch,
  useHistory,
} from "react-router-dom";

import { Layout } from "antd";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { SideNav } from "./components/Navbar/SideNav";
import { NavigationBar } from "./components/Navbar/NavigationBar";
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
import { useAuth } from "./hooks/auth/useAuth";
import { LoginPage } from "./pages/login-page/login.page";
import { RoleNames } from "./domain/Users";
import { MyPrograms } from "./pages/protected/my-programs/myPrograms.page";
import { isPermitted } from "./utils/identity.utils";
import { routesData, useRoutes } from "./hooks/useRoutes";
import { ChildMenuItem, ParentMenuItem } from "./domain/Routes";
import { useSubscribeToStreamerConnected } from "./hooks/useSubscribeToStreamerConnected";

const RoleProtectedRoute: React.FC<{
  requiredRoles?: RoleNames[];
  component: RouteProps["component"];
  path: string;
  exact?: boolean;
}> = (props) => {
  const { roles } = useAuth();
  const history = useHistory();
  if (!isPermitted(roles, props.requiredRoles)) {
    history.push("/");
    // return <Redirect to="/" />;
    return null;
  }
  console.log("Rendering route", props.path);

  return (
    <Route path={props.path} exact={props.exact} component={props.component} />
  );
};

const ProtectedRoute: React.FC = (props) => {
  const { isAuthenticated } = useAuth();
  const { routes } = useRoutes();
  const history = useHistory();

  const routesToRender = useMemo(() => {
    const components: ReactElement[] = [];

    routes.forEach((route) => {
      if (route.page) {
        components.push(
          <RoleProtectedRoute
            key={route.id}
            path={(route as ChildMenuItem).route}
            exact={true}
            component={route.page}
            requiredRoles={(route as ChildMenuItem).requiredRole}
          />
        );
        return;
      }
      (route as ParentMenuItem).children.forEach((c) => {
        components.push(
          <RoleProtectedRoute
            exact={true}
            key={c.id}
            requiredRoles={c.requiredRole}
            path={c.route}
            component={c.page}
          />
        );
      });
    });

    return components;
  }, [routes]);
  if (!isAuthenticated) {
    // return <Redirect to="/login" />;
    history.push("/login");
    return null;
  }

  console.log("Routes to render", routesToRender);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideNav />
      <Layout style={{ marginLeft: 200 }}>
        <NavigationBar />
        <Layout.Content style={{ padding: "0 50px", marginTop: 64 }}>
          <Switch>{routesToRender}</Switch>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

const ChildrenRoutes: React.FC<{ childrenRoutes: any[] }> = (props) => {
  console.log("Children inside", props.childrenRoutes);
  return (
    <>
      {props.childrenRoutes.map((r) => {
        console.log("Returnng role protected for", r);
        return (
          <RoleProtectedRoute
            exact={true}
            key={r.id}
            requiredRoles={r.requiredRole}
            path={r.route}
            component={r.page}
          />
        );
      })}
    </>
  );
};

export const Routes: React.FC = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/forgot-password" component={ForgotPasswordPage} />
          <Route path="/reset-password" component={ResetPasswordPage} />
          <Route component={() => <ProtectedRoute />} />
        </Switch>
      </Router>
      <ToastContainer />
    </>
  );
};
