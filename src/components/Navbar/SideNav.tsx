import * as React from "react";
import { Link as RouterLink } from "react-router-dom";

import { Layout, Menu } from "antd";
import { LogoWrapper, LogoImage } from "../base/NavigationBase";
import { useAuth } from "../../hooks/auth/useAuth";
import { useRoutes } from "../../hooks/useRoutes";
import { ChildMenuItem, ParentMenuItem } from "../../domain/Routes";
import { isPermitted } from "../../utils/identity.utils";
const { Sider } = Layout;

export const SideNav: React.FC<Record<string, unknown>> = () => {
  const { roles } = useAuth();
  const { routes } = useRoutes();

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
          {routes.map((o) => {
            if (o.hideFromMenu) {
              return null;
            }
            const { children } = o as ParentMenuItem;
            if (children) {
              return (
                <Menu.SubMenu
                  key={o.id}
                  title={o.title}
                  icon={o.icon && <o.icon />}
                >
                  {children.map((c) => {
                    if (c.hideFromMenu) {
                      return null;
                    }
                    if (c.requiredRole) {
                      if (!isPermitted(roles, c.requiredRole)) {
                        return null;
                      }
                    }
                    return (
                      <Menu.Item key={o.id + c.id} icon={c.icon && <c.icon />}>
                        <RouterLink to={c.route}>{c.title}</RouterLink>
                      </Menu.Item>
                    );
                  })}
                </Menu.SubMenu>
              );
            }
            return (
              <Menu.Item key={o.id} icon={o.icon && <o.icon />}>
                <RouterLink to={(o as ChildMenuItem).route}>
                  {o.title}
                </RouterLink>
              </Menu.Item>
            );
          })}
        </Menu>
      </Sider>
    </React.Fragment>
  );
};
