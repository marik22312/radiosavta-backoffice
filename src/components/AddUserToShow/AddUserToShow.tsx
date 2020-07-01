import { ProgramUser } from "../../models/types";
import React, { useState } from "react";
import { Col, FormGroup, Input, Label, Button } from "reactstrap";

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
      <Col xs={9} md={9}>
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
      <Col xs={3} md={3}>
        <Button onClick={() => props.onSave(selectedUser!)}>Save</Button>
        <Button color="danger" onClick={() => props.onCancel()}>
          Cancel
        </Button>
      </Col>
    </React.Fragment>
  );
};
