import styled from "styled-components";

export const PageBase = styled.div`
  padding-top: 15px;
  background-color: #e6f9ee;
  padding-bottom: 15px;
  overflow: auto;
  height: calc(100% - 72px);
`;

export const PageHeader = styled.div`
  color: #000000;
`;

export const PageTitle = styled.h1`
  font-size: 40px;
  text-transform: capitalize;
`;

export const PageContent = styled.main`
  overflow: visible;
  min-height: 60%;
`;
