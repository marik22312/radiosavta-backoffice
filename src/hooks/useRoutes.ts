import { MenuItem } from "../domain/Routes";
import {
  DashboardOutlined,
  AudioOutlined,
  UserOutlined,
  UserAddOutlined,
  UnorderedListOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import { RoleNames } from "../domain/Users";
import { useMemo } from "react";

const routesData: MenuItem[] = [
  {
    id: 1,
    route: "/",
    title: "Home",
    icon: DashboardOutlined,
  },
  {
    id: 2,
    title: "Users",
    icon: UserOutlined,
    children: [
      {
        id: 21,
        route: "/users",
        title: "Users List",
        icon: UnorderedListOutlined,
      },
      {
        id: 22,
        route: "/users/create",
        title: "Create user",
        icon: UserAddOutlined,
        requiredRole: [RoleNames.ADMIN],
      },
    ],
  },
  {
    id: 3,
    title: "Programs",
    icon: AudioOutlined,
    children: [
      {
        id: 31,
        route: "/programs",
        title: "All Programs",
        icon: UnorderedListOutlined,
        requiredRole: [RoleNames.ADMIN],
      },
      {
        id: 32,
        route: "/programs/create",
        title: "Create program",
        icon: FileAddOutlined,
        requiredRole: [RoleNames.ADMIN],
      },
      {
        id: 33,
        route: "/my-programs",
        title: "My Programs",
        icon: AudioOutlined,
      },
    ],
  },
];
export const useRoutes = () => {
  const routes = useMemo(() => routesData, []);

  return {
    routes,
  };
};
