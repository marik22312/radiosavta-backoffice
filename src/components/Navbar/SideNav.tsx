import * as React from "react";
import { Link as RouterLink } from "react-router-dom";

import {
  DashboardOutlined,
  AudioOutlined,
  UserOutlined,
  UserAddOutlined,
  UnorderedListOutlined,
  FileAddOutlined,
} from "@ant-design/icons";

import { Layout, Menu } from "antd";
import { LogoWrapper, LogoImage } from "../base/NavigationBase";
import { RoleNames } from "../../domain/Users";
import { useAuth } from "../../hooks/auth/useAuth";
const { Sider } = Layout;

interface SideNavOption {
  id: number;
  title: string;
  link: string;
  icon: any;
}

interface ChildMenuItem {
  id: number;
  url: string;
  title: string;
  icon?: any;
  requiredRole?: RoleNames;
}
interface ParentMenuItem {
  id: number;
  title: string;
  children: ChildMenuItem[];
  icon?: any;
}

type MenuItem = ParentMenuItem | ChildMenuItem;

export const SideNav: React.FC<Record<string, unknown>> = () => {
  const newSideNavOptions: MenuItem[] = [
    {
      id: 1,
      url: "/",
      title: "Home",
      icon: <DashboardOutlined />,
    },
    {
      id: 2,
      title: "Users",
      icon: <UserOutlined />,
      children: [
        {
          id: 1,
          url: "/users",
          title: "Users List",
          icon: <UnorderedListOutlined />,
        },
        {
          id: 2,
          url: "/users/create",
          title: "Create user",
          icon: <UserAddOutlined />,
          requiredRole: RoleNames.ADMIN,
        },
      ],
    },
    {
      id: 3,
      title: "Programs",
      icon: <AudioOutlined />,
      children: [
        {
          id: 1,
          url: "/programs",
          title: "All Programs",
          icon: <UnorderedListOutlined />,
          requiredRole: RoleNames.ADMIN,
        },
        {
          id: 2,
          url: "/programs/create",
          title: "Create program",
          icon: <FileAddOutlined />,
          requiredRole: RoleNames.ADMIN,
        },
        {
          id: 3,
          url: "/my-programs",
          title: "My Programs",
          icon: <FileAddOutlined />,
        },
      ],
    },
  ];

  const { roles } = useAuth();

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
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          {newSideNavOptions.map((o) => {
            const { children } = o as ParentMenuItem;
            if (children) {
              return (
                <Menu.SubMenu key={o.id} title={o.title} icon={o.icon}>
                  {children.map((c) => {
                    if (c.requiredRole) {
                      if (!roles.includes(c.requiredRole)) {
                        return null;
                      }
                    }
                    return (
                      <Menu.Item key={o.id + c.id} icon={c.icon}>
                        <RouterLink to={c.url}>{c.title}</RouterLink>
                      </Menu.Item>
                    );
                  })}
                </Menu.SubMenu>
              );
            }
            return (
              <Menu.Item key={o.id} icon={o.icon}>
                <RouterLink to={(o as ChildMenuItem).url}>{o.title}</RouterLink>
              </Menu.Item>
            );
          })}
        </Menu>
      </Sider>
    </React.Fragment>
  );
};
