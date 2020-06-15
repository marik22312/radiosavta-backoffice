import styled from "styled-components";

export const CardBase = styled.section<any>`
  background-color: #fafafa;
  border-radius: 5px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.25);
  padding: 15px;
  height: ${(props) => (props.fullHeight ? "100%" : "unset")};
`;

export const InteractiveCardBase = styled(CardBase)`
  transform: translate(0, 0);
  transition: all 0.15s ease-out;

  &:hover {
    box-shadow: 4px 4px 11px rgba(0, 0, 0, 0.25);
    transform: translate(-1px, -1px);
    cursor: pointer;
    background-color: #e8e8e8;
  }
`;

export const CardHeader = styled.div`
  color: #000000;
  padding-top: 15px;
  padding-right: 15px;
  padding-left: 15px;
`;

export const CardTitle = styled.h2`
  font-size: 30px;
  text-transform: capitalize;
`;

export const CardContent = styled.div``;
