import { inject, observer } from "mobx-react";
import React from "react";
import {
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarText,
  NavbarToggler,
  UncontrolledDropdown
} from "reactstrap";

import IdentityStore from "../../stores/identity.store";
import { ResetPasswordModal } from "../ResetPasswordModal/ResetPasswordModal";

interface State {
  isOpen: boolean;
  isResetPasswordModalOpen: boolean;
}
interface Props {
  identityStore?: IdentityStore;
}

@inject("identityStore")
@observer
export class NavigationBar extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      isOpen: false,
      isResetPasswordModalOpen: false
    };
  }

  public toggle = () => this.setState({ isOpen: !this.state.isOpen });
  public logout = () => {
    return this.props.identityStore?.logout();
  };

  public render() {
    const { isOpen } = this.state;
    const { identityStore } = this.props;
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Radiosavta Backoffice</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              {/* <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
            </NavItem> */}
              {/* <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Option 1
                </DropdownItem>
                <DropdownItem>
                  Option 2
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown> */}
            </Nav>
            <UncontrolledDropdown>
              <DropdownToggle nav caret>
                <NavbarText>{identityStore?.user.name}</NavbarText>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick={() => this.openChangePasswordModal()}>
                  Change password
                </DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={this.logout}>Logout</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Collapse>
        </Navbar>
        <ResetPasswordModal
          isOpen={this.state.isResetPasswordModalOpen}
          toggle={() => this.openChangePasswordModal()}
        />
      </div>
    );
  }

  private openChangePasswordModal(): void {
    const { isResetPasswordModalOpen } = this.state;
    this.setState({ isResetPasswordModalOpen: !isResetPasswordModalOpen });
  }
}
