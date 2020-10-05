import React from "react";

import { Select, Avatar } from "antd";
import { BASE_IMAGES_URL } from "../../config/constants.config";

export interface UserDropdownProps {
  users: any[];
  onChange?(selectedUsers: number[] | number): void;
  multiple?: boolean;
}

export const UsersDropdown: React.FC<UserDropdownProps> = (props) => {
  return (
    <Select
      defaultValue={[]}
      mode={props.multiple ? "multiple" : undefined}
      style={{ width: "100%" }}
      placeholder="Select at least 1 crew member"
      onChange={props.onChange}
      onSearch={(values) => console.log(values)}
      showSearch
    >
      {props.users.map((u) => {
        return (
          <Select.Option key={u.id} value={u.id} label={u.name}>
            <Avatar
              shape="square"
              size="small"
              src={`${BASE_IMAGES_URL}/${u.profile_image}`}
            >
              {u.name}
            </Avatar>{" "}
            {u.name}
          </Select.Option>
        );
      })}
    </Select>
  );
};
