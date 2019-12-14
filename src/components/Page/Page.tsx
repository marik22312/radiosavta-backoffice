import * as React from "react";
import { Col, Row } from "reactstrap";
import { PageBase, PageContent, PageHeader, PageTitle } from "../base/PageBase";

interface HeaderProps {
  title: string;
}

interface PageContentProps {
  title?: string;
}

export class Page extends React.Component<{}, {}> {
  public static Title: React.FC<HeaderProps> = props => {
    return <PageTitle>{props.title}</PageTitle>;
  };

  public static Header: React.FC = props => (
    <PageHeader>{props.children}</PageHeader>
  );

  public static Content: React.FC<PageContentProps> = props => (
    <PageContent>{props.children}</PageContent>
  );

  constructor(props: any) {
    super(props);

    this.state = {};
  }

  public render() {
    const { children } = this.props;
    return <PageBase>{children}</PageBase>;
  }
}
