import React from "react";
import { UserTagBase, UserTagSuffixBase } from "./UserTag.base";

export interface UserTagProps {
  removeable: boolean;
  onRemove?(): void;
  onClick?(): void;
}
export const UserTag: React.FC<UserTagProps> = (props) => {
  if (props.removeable) {
    return (
      <React.Fragment>
        <UserTagBase removeable>{props.children}</UserTagBase>
        <UserTagSuffixBase onClick={props.onRemove}>X</UserTagSuffixBase>
      </React.Fragment>
    );
  }
  return <UserTagBase>{props.children}</UserTagBase>;
};
