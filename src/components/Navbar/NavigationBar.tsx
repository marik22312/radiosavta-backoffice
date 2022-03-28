import React from "react";

import { inject, observer } from "mobx-react";

import { toast } from "react-toastify";

import {
  Layout,
  Menu,
  Dropdown,
  Row,
  Col,
  Avatar,
  Button,
  Tooltip,
} from "antd";

import IdentityStore from "../../stores/identity.store";
import { ChangePasswordModal } from "../ChangePasswordModal/ChangePasswordModal";
import { useLogout } from "../../hooks/auth/useLogout";
import { useAuth } from "../../hooks/auth/useAuth";
import { BASE_IMAGES_URL } from "../../config/constants.config";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBroadcastTower,
  faCompactDisc,
  faHeadphones,
} from "@fortawesome/free-solid-svg-icons";
import { useStreamInfo } from "./hooks/userServerStats";

import ServerStatsStyle from "./ServerStats.module.scss";
import { LIVE_STREAM_URL } from "../../config/contacts";

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
const ProfileMenuItem: React.FC = () => {
  const history = useHistory();
  return (
    <Menu.Item onClick={() => history.push("/settings/profile")}>
      My Profile
    </Menu.Item>
  );
};

const NavBarMenuButton: React.FC = (props) => {
  const { user } = useAuth();
  return (
    <Button
      icon={
        <Avatar
          size={"small"}
          src={`${BASE_IMAGES_URL}/${user?.profile_image}`}
        >
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
        <ProfileMenuItem />
        <Menu.Item onClick={() => this.openChangePasswordModal()}>
          Change password
        </Menu.Item>
        <LogoutMenuItem />
      </Menu>
    );

    return (
      <React.Fragment>
        <Layout.Header style={{ position: "fixed", zIndex: 3, width: "100%" }}>
          <Row>
            <Col span={12}>
              <ServerStats />
            </Col>
            <Col span={4} offset={5}>
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

export const ServerStats = () => {
  const { streamInfo } = useStreamInfo();
  return (
    <div className={ServerStatsStyle.serverStatsWrapper}>
      <div className={ServerStatsStyle.stat} title="Stream source">
        <Tooltip placement="bottom" title="Stream source">
          <FontAwesomeIcon
            size="2x"
            icon={
              streamInfo?.isLive
                ? (faBroadcastTower as any)
                : (faCompactDisc as any)
            }
          />{" "}
          {streamInfo?.isLive ? "Live" : "Auto DJ"}
        </Tooltip>
      </div>
      <div className={ServerStatsStyle.stat} title="Live Listeners">
        <Tooltip placement="bottom" title="Live Listeners Count">
          <FontAwesomeIcon
            size="2x"
            icon={faHeadphones as any}
            color="#ffffff"
          />{" "}
          {streamInfo?.listeners} Live Listeners
        </Tooltip>
      </div>
      {/* // TODO: Fix playing state so it wont "pause"  */}
      {/* <div className={ServerStatsStyle.stat} title="Live Listeners">
        <audio
          className={ServerStatsStyle.livePlayer}
          src={LIVE_STREAM_URL}
          controls
        />
      </div> */}
    </div>
  );
};
