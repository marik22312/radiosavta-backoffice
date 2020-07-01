import styled from "styled-components";

export const UserTagBase = styled.div<any>`
  background-color: #7f7f7f;
  display: inline-block;
  padding: 2px 5px;
  border-radius: ${(props) => (props.removeable ? "5px 0 0 5px" : "5px")};
  color: white;
  margin-right: ${(props) => (props.removeable ? "0" : "5px")};
`;
export const UserTagSuffixBase = styled.div`
  background-color: #7f7f7f;
  display: inline-block;
  padding: 2px 5px;
  border-radius: 0 5px 5px 0;
  color: white;
  margin-right: 5px;
  min-height: 100%;

  &:hover {
    cursor: pointer;
    color: red;
  }
`;
