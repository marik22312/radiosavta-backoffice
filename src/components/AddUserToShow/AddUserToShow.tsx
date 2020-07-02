import { ProgramUser } from "../../models/types";
import React, { useState } from "react";
import { FormGroup, Input } from "reactstrap";
import { Col, Button } from "antd";

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
        <FormGroup>
          <Input
            type="select"
            name="user-to-show-select"
            id="exampleSelect"
            onChange={(e) => setSelectedUser(parseInt(e.target.value))}
            value={selectedUser}
          >
            <option disabled selected value={""}>
              -- select an option --
            </option>
            {props.availableUsers.map((u: ProgramUser) => {
              return (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              );
            })}
          </Input>
        </FormGroup>
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
