import React from "react";
import { RoleNames } from "./Users";

export interface ParentMenuItem {
  id: number;
  title: string;
  children: ChildMenuItem[];
  icon?: any;
  hideFromMenu?: boolean;
  page?: any;
}
export interface ChildMenuItem {
  id: number;
  route: string;
  title: string;
  icon?: any;
  requiredRole?: RoleNames[];
  page: any;
  hideFromMenu?: boolean;
}

export type MenuItem = ParentMenuItem | ChildMenuItem;
