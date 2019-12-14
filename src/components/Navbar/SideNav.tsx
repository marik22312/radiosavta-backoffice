import * as React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import { NavigationWrapper } from "../base/NavigationBase";
import { NavigationBar } from "./NavBar";

interface Props {}
interface SideNavOption {
  id: number;
  title: string;
  link: string;
}

export class SideNav extends React.Component<Props, {}> {
  private sideNavOptions: SideNavOption[];
  constructor(props: Props) {
    super(props);
    this.state = {};

    this.sideNavOptions = [
      {
        id: 1,
        link: "/users",
        title: "Users",
      }
    ];
  }

  public render() {
    return (
		<React.Fragment>
		  <NavigationBar />
        <NavigationWrapper>
          <Nav vertical>
            <NavItem>
              <NavLink>Link</NavLink>
            </NavItem>
            <NavItem>
              <NavLink>Link</NavLink>
            </NavItem>
            <NavItem>
              <NavLink>Link</NavLink>
            </NavItem>
          </Nav>
        </NavigationWrapper>
		</React.Fragment>
    );
  }
}
