import { inject, observer } from 'mobx-react';
import React, { useState } from 'react';
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
  NavItem,
  NavLink,
  UncontrolledDropdown
} from 'reactstrap';

import IdentityStore from '../../stores/identity.store';



@inject('identityStore')
@observer
export class NavigationBar extends React.Component<{
	identityStore?: IdentityStore
}, {
	isOpen: boolean
}> {

	constructor(props: any) {
		super(props);

		this.state = {
			isOpen: false
		}
	}

  public toggle = () => this.setState({isOpen: !this.state.isOpen});

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
          <NavbarText>{identityStore?.user.name}</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  )};
}