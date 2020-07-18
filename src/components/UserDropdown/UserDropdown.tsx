import React from "react";

import { Select, Avatar } from "antd";

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
    >
      {props.users.map((u) => {
        return (
          <Select.Option key={u.id} value={u.id} label={u.name}>
            <Avatar
              shape="square"
              size="small"
              src={`https://res.cloudinary.com/marik-shnitman/image/upload/w_254/v1547932540/${u.profile_image}`}
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
