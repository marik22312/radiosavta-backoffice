import React from "react";
import { TagBase, TagSuffixBase } from "./Tag.base";

export interface TagProps {
  removeable: boolean;
  onRemove?(): void;
  onClick?(): void;
}
export const Tag: React.FC<TagProps> = (props) => {
  if (props.removeable) {
    return (
      <React.Fragment>
        <TagBase removeable>{props.children}</TagBase>
        <TagSuffixBase onClick={props.onRemove}>X</TagSuffixBase>
      </React.Fragment>
    );
  }
  return <TagBase>{props.children}</TagBase>;
};
