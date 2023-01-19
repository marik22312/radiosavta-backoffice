import React, { useMemo, ReactElement, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  RouteProps,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";

import { Layout } from "antd";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { SideNav } from "./components/Navbar/SideNav";
import { NavigationBar } from "./components/Navbar/NavigationBar";
import { ResetPasswordPage } from "./pages/reset-password/ResetPassword.page";
import { ForgotPasswordPage } from "./pages/forgot-password/ForgotPassword.page";
import { useAuth } from "./hooks/auth/useAuth";
import { LoginPage } from "./pages/login-page/login.page";
import { RoleNames } from "./domain/Users";
import { isPermitted } from "./utils/identity.utils";
import { useRoutes } from "./hooks/useRoutes";
import { ChildMenuItem, ParentMenuItem } from "./domain/Routes";
import { logRouteChange } from "./api/mixpanel.api";

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

  return (
    <Route path={props.path} exact={props.exact} component={props.component} />
  );
};

const useRouteChangeBi = () => {
  const location = useLocation();
  useEffect(() => {
    logRouteChange(location.pathname);
  }, [location]);
};

const ProtectedRoute: React.FC = (props) => {
  const { isAuthenticated } = useAuth();
  const { routes } = useRoutes();
  const history = useHistory();
  useRouteChangeBi();

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
