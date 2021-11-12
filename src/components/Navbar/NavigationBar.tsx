import React from "react";

import { inject, observer } from "mobx-react";

import { toast } from "react-toastify";

import { Layout, Menu, Dropdown, Row, Col, Avatar, Button } from "antd";

import IdentityStore from "../../stores/identity.store";
import { ChangePasswordModal } from "../ChangePasswordModal/ChangePasswordModal";
import { useLogout } from "../../hooks/auth/useLogout";
import { useLoggedInUser } from "../../hooks/auth/useLoggedInUser";
import { useAuth } from "../../hooks/auth/useAuth";

interface State {
  isOpen: boolean;
  isChangePasswordModalOpen: boolean;
}
interface Props {
  identityStore?: IdentityStore;
}

const LogoutMenuItem: React.FC = () => {
  const { logout } = useLogout();
  return <Menu.Item onClick={logout}>Logout</Menu.Item>;
};

const NavBarMenuButton: React.FC = (props) => {
  const { user } = useAuth();
  console.log("User", user);
  return (
    <Button
      icon={
        <Avatar size={"small"}>
          {user?.name.split(" ").reduce((acc, subname) => acc + subname[0], "")}
        </Avatar>
      }
      {...props}
    >
      {user?.name}
    </Button>
  );
};
@inject("identityStore")
@observer
export class NavigationBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isOpen: false,
      isChangePasswordModalOpen: false,
    };
  }

  public toggle = () => this.setState({ isOpen: !this.state.isOpen });

  public render() {
    const userMenu = (
      <Menu>
        <Menu.Item onClick={() => this.openChangePasswordModal()}>
          Change password
        </Menu.Item>
        <LogoutMenuItem />
      </Menu>
    );

    return (
      <React.Fragment>
        <Layout.Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
          <Row>
            <Col span={4} offset={17}>
              <Dropdown overlay={userMenu}>
                <NavBarMenuButton />
              </Dropdown>
            </Col>
          </Row>
        </Layout.Header>
        <ChangePasswordModal
          isOpen={this.state.isChangePasswordModalOpen}
          toggle={() => this.openChangePasswordModal()}
          onSubmit={(values) => this.onChangePassword(values)}
        />
      </React.Fragment>
    );
  }

  private openChangePasswordModal(): void {
    const { isChangePasswordModalOpen } = this.state;
    this.setState({ isChangePasswordModalOpen: !isChangePasswordModalOpen });
  }

  private async onChangePassword({
    newPassword = "",
    oldPassword = "",
    passwordRepeat = "",
  }) {
    const response = await this.props.identityStore!.resetPassword({
      newPassword,
      oldPassword,
      passwordRepeat,
    });
    if (response.error) {
      return response.error;
    }
    this.openChangePasswordModal();
    toast.success("Password changed successfully!", {
      position: "bottom-right",
      autoClose: 3000,
    });
    return null;
  }
}
