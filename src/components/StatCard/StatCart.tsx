import * as React from "react";
import styled from "styled-components";

import Loader from "react-loader-spinner";

import { Card } from "../Card/Card";

interface Props {
  title: string;
  body?: number | string;
  units?: string;
  interactive?: boolean;
  onClick?(e: any): void;
}

export const StatCardTitle = styled.h4`
  text-align: center;
`;

export const StatCardBody = styled.div`
  display: flex;
  justify-content: center;
`;
export const StatCardFooter = styled.div`
  display: flex;
  justify-content: center;
`;

export const StatCardNumber = styled.p`
  font-size: 3.5rem;
  text-align: center;
`;

export class StatCard extends React.PureComponent<Props, {}> {
  public render() {
    return (
      <Card
        fullHeight
        interactive={this.props.interactive}
        onClick={this.props.onClick}
      >
        <Card.Header>
          <StatCardTitle>{this.props.title}</StatCardTitle>
          <Card.Content>
            <StatCardBody>{this.renderCardBody()}</StatCardBody>
            {<StatCardFooter>{this.renderCardFooter()}</StatCardFooter>}
          </Card.Content>
        </Card.Header>
      </Card>
    );
  }

  private getLoader() {
    return <Loader type="TailSpin" color="#0F0F0F" height={50} width={50} />;
  }

  private renderCardBody() {
    const { body } = this.props;

    if (!body) {
      return <StatCardNumber>{this.getLoader()}</StatCardNumber>;
    }
    return <StatCardNumber>{body}</StatCardNumber>;
  }
  private renderCardFooter() {
    return <div>{this.props.units}</div>;
  }
}
