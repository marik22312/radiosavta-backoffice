import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import { observer, inject } from "mobx-react";
import { LoginPage } from "./pages/login-page/login.page";
import { HomePage } from "./pages/home-page/home.page";
import IdentityStore from "./stores/identity.store";
import { SideNav } from "./components/Navbar/SideNav";

const DefaultContainer: React.FC = () => {
  return (
    <main style={{height: '100%'}}>
		<SideNav />
		<div style={{display: 'inline-block', position: 'absolute', width: '84%', height: '100%'}}>
      <Switch>
        <Route path="/" exact component={HomePage} />
        {/* 
        <Route path="/users/create" exact component={CreateUser} />
        <Route path="/programs" exact component={ProgramsPage} />
        <Route path="/programs/:programId" exact component={SingleProgramPage} />
        <Route path="/settings" exact component={SettingsPage} />
        <Route component={ApiLoader} /> */}
      </Switch>
	  </div>
    </main>
  );
};

interface Props {
  identityStore?: IdentityStore;
}

@inject("identityStore")
@observer
export default class Routes extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }
  render() {
    const { identityStore } = this.props;
    return (
      <Router>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route
            component={() =>
              identityStore!.isLoggedIn ? (
                <DefaultContainer />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
        </Switch>
      </Router>
    );
  }
}
