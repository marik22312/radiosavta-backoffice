import * as React from "react";
import { CardBase, CardContent, CardHeader, CardTitle } from "../base/CardBase";

interface HeaderProps {
  title: string;
}

interface PageContentProps {
  title?: string;
}

export class Card extends React.Component<{}, {}> {
  public static Title: React.FC<HeaderProps> = props => {
    return <CardTitle>{props.title}</CardTitle>;
  };

  public static Header: React.FC = props => (
    <React.Fragment>
      <CardHeader>{props.children}</CardHeader>
      <hr />
    </React.Fragment>
  );

  public static Content: React.FC<PageContentProps> = props => (
    <CardContent>{props.children}</CardContent>
  );

  constructor(props: any) {
    super(props);

    this.state = {};
  }

  public render() {
    const { children } = this.props;
    return <CardBase>{children}</CardBase>;
  }
}
