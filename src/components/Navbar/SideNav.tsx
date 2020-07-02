import * as React from "react";
import { Link as RouterLink } from "react-router-dom";

import {
  DashboardOutlined,
  AudioOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import { Layout, Menu } from "antd";
import { LogoWrapper, LogoImage } from "../base/NavigationBase";
const { Sider } = Layout;

interface SideNavOption {
  id: number;
  title: string;
  link: string;
  icon: JSX.Element;
}

export class SideNav extends React.Component<{}, {}> {
  private sideNavOptions: SideNavOption[];
  constructor(props: any) {
    super(props);
    this.sideNavOptions = [
      {
        id: 1,
        link: "/",
        title: "Home",
        icon: <DashboardOutlined />,
      },
      //   {
      //     id: 2,
      //     link: "/users",
      //     title: "Users"
      //	 icon: <UserSwitchOutlined />
      //   },
      {
        id: 3,
        link: "/programs",
        title: "Programs",
        icon: <AudioOutlined />,
      },
      {
        id: 4,
        link: "/settings",
        title: "Settings",
        icon: <SettingOutlined />,
      },
    ];
  }

  public render() {
    return (
      <React.Fragment>
        <Sider
          theme="dark"
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
          }}
        >
          <LogoWrapper>
            <LogoImage
              alt="Radiosavta Logo"
              title="Radiosavta Logo"
              src="https://res.cloudinary.com/marik-shnitman/image/upload/c_scale,w_150/v1554809072/radiosavta/logo_head.png"
            />
          </LogoWrapper>
          <Menu theme="dark" mode="inline">
            {this.sideNavOptions.map((option) => (
              <Menu.Item key={option.id} className="navItem" icon={option.icon}>
                {option.title}
                <RouterLink to={option.link} />
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
      </React.Fragment>
    );
  }
}
