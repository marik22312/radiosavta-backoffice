import { RoleNames } from "./Users";

export interface ChildMenuItem {
  id: number;
  route: string;
  title: string;
  icon?: any;
  requiredRole?: RoleNames[];
}

export interface ParentMenuItem {
  id: number;
  title: string;
  children: ChildMenuItem[];
  icon?: any;
}

export type MenuItem = ParentMenuItem | ChildMenuItem;
