import React from "react";

import { inject, observer } from "mobx-react";

import { toast } from 'react-toastify';

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
import { ChangePasswordModal } from "../ChangePasswordModal/ChangePasswordModal";

interface State {
  isOpen: boolean;
  isChangePasswordModalOpen: boolean;
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
      isChangePasswordModalOpen: false
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
                  Change
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
                <DropdownItem divider />
                <DropdownItem onClick={this.logout}>Logout</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Collapse>
        </Navbar>
        <ChangePasswordModal
          isOpen={this.state.isChangePasswordModalOpen}
		  toggle={() => this.openChangePasswordModal()}
		  onSubmit={values => this.onChangePassword(values)}
        />
      </div>
    );
  }

  private openChangePasswordModal(): void {
    const { isChangePasswordModalOpen } = this.state;
    this.setState({ isChangePasswordModalOpen: !isChangePasswordModalOpen });
  }

  private async onChangePassword({
	  newPassword = '',
	  oldPassword = '',
	  passwordRepeat = ''
  }) {
		  const response = await this.props.identityStore!.resetPassword({newPassword, oldPassword, passwordRepeat});
		  if (response.error) {
			  return response.error;
		  }
		  this.openChangePasswordModal();
		  toast.success('Password changed successfully!', {
			  position: "bottom-right",
			  autoClose: 3000
		  })
		  return null;
  }
}
