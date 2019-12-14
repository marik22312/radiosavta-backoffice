import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Nav, NavItem, NavLink } from "reactstrap";
import { NavigationWrapper } from "../base/NavigationBase";
import { NavigationBar } from "./NavBar";
import './SideNav.scss';

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
        link: "/",
        title: "home"
      },
      {
        id: 1,
        link: "/users",
        title: "Users"
      },
      {
        id: 1,
        link: "/programs",
        title: "programs"
      },
      {
        id: 1,
        link: "/settings",
        title: "settings"
      }
    ];
  }

  public render() {
    return (
      <React.Fragment>
        <NavigationBar />
        <NavigationWrapper>
			Some Logo
          <Nav vertical className='sidebar-Nav'>
            {this.sideNavOptions.map(option => (
              <NavItem key={option.id} className='navItem'>
                <NavLink to={option.link} tag={RouterLink} className='navLink'>
                  {option.title}
                </NavLink>
              </NavItem>
            ))}
          </Nav>
        </NavigationWrapper>
      </React.Fragment>
    );
  }
}
