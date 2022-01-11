import React from "react";
import { MenuItem } from "../domain/Routes";
import {
  DashboardOutlined,
  AudioOutlined,
  UserOutlined,
  UserAddOutlined,
  UnorderedListOutlined,
  FileAddOutlined,
  FileAddFilled,
} from "@ant-design/icons";
import { RoleNames } from "../domain/Users";
import { useMemo } from "react";
import { UsersPage } from "../pages/protected/users/Users.page";
import { CreateUserPage } from "../pages/protected/users/create/createUser.page";
import { ProgramsPage } from "../pages/protected/programs/programs.page";
import { CreateProgramPage } from "../pages/protected/programs/create-program/CreateProgram";
import { MyPrograms } from "../pages/protected/my-programs/myPrograms.page";
import { HomePage } from "../pages/protected/home-page/home.page";
import { SingleProgramPage } from "../pages/protected/programs/singleProgram/singleProgram.page";
import { UploadedRecordedShowPage } from "../pages/protected/programs/singleProgram/UploadRecordedShow/UploadedRecordedShowPage";

export const routesData: MenuItem[] = [
  {
    id: 1,
    route: "/",
    title: "Home",
    icon: DashboardOutlined,
    page: HomePage,
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
        page: UsersPage,
      },
      {
        id: 22,
        route: "/users/create",
        title: "Create user",
        icon: UserAddOutlined,
        requiredRole: [RoleNames.ADMIN],
        page: CreateUserPage,
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
        page: ProgramsPage,
      },
      {
        id: 32,
        route: "/programs/create",
        title: "Create program",
        icon: FileAddOutlined,
        requiredRole: [RoleNames.ADMIN],
        page: CreateProgramPage,
      },
      {
        id: 33,
        route: "/programs/:id",
        title: "Single Program PAge",
        icon: UnorderedListOutlined,
        page: SingleProgramPage,
        hideFromMenu: true,
      },
      {
        id: 34,
        route: "/programs/:programId/upload-show",
        title: "Upload Show",
        icon: FileAddFilled,
        page: UploadedRecordedShowPage,
        hideFromMenu: true,
      },
      {
        id: 35,
        route: "/my-programs",
        title: "My Programs",
        icon: AudioOutlined,
        page: MyPrograms,
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
