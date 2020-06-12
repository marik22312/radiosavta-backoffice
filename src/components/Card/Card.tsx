import * as React from "react";
import { CardBase, CardContent, CardHeader, CardTitle, InteractiveCardBase } from "../base/CardBase";

interface HeaderProps {
  title: string;
}

interface PageContentProps {
  title?: string;
}

export class Card extends React.Component<
  {
    fullHeight?: boolean;
    interactive?: boolean;
    onClick?(e: any): void;
  },
  {}
> {
  public static Title: React.FC<HeaderProps> = props => {
    return <CardTitle>{props.title}</CardTitle>;
  };

  public static Header: React.FC = props => (
    <React.Fragment>
      <CardHeader>{props.children}</CardHeader>
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
    const { children, interactive, fullHeight } = this.props;

    if (interactive) {
      return (
        <InteractiveCardBase
          // @ts-ignore
		  fullHeight={fullHeight}
		  onClick={this.props.onClick}
        >
          {children}
        </InteractiveCardBase>
      );
    }
    return (
      <CardBase
        // @ts-ignore
        fullHeight={fullHeight}
      >
        {children}
      </CardBase>
    );
  }
}
