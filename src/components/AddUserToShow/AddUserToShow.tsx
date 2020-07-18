import { Col, Button } from "antd";
import React, { useState } from "react";

import { ProgramUser } from "../../models/types";

import { UsersDropdown } from "../UserDropdown/UserDropdown";

export interface AddUserToShowCardProps {
  availableUsers: ProgramUser[];
  selectedUserId?: ProgramUser["id"];
  onCancel(): void;
  onSave(id: ProgramUser["id"]): Promise<any>;
}
export const AddUserToShowCard: React.FC<AddUserToShowCardProps> = (props) => {
  const [selectedUser, setSelectedUser] = useState(props.selectedUserId);

  return (
    <React.Fragment>
      <Col span={18}>
        <UsersDropdown
          users={props.availableUsers}
          onChange={(userId: number) => setSelectedUser(userId)}
        />
      </Col>
      <Col span={6}>
        <Button type="primary" onClick={() => props.onSave(selectedUser!)}>
          Save
        </Button>
        <Button danger onClick={() => props.onCancel()}>
          Cancel
        </Button>
      </Col>
    </React.Fragment>
  );
};
