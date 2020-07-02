import * as React from "react";
import { Layout, Breadcrumb, Typography } from "antd";
import { Link } from "react-router-dom";

interface PageProps {
  breadcrumbs?: string[];
  title?: string;
}

export class Page extends React.Component<PageProps, Record<string, unknown>> {
  constructor(props: any) {
    super(props);

    this.state = {};
  }

  private renderBreadcrumbs() {
    return this.props.breadcrumbs!.map((b) => (
      <Breadcrumb.Item key={b}>
        <Link to="">{b}</Link>
      </Breadcrumb.Item>
    ));
  }

  public render() {
    const { children, title } = this.props;
    return (
      <React.Fragment>
        <div>
          <Typography.Title>{title}</Typography.Title>
        </div>
        <Layout.Content className="site-layout" style={{ margin: "0 16px" }}>
          {this.props.breadcrumbs && (
            <Breadcrumb style={{ margin: "16px 0" }}>
              {this.renderBreadcrumbs()}
              <Breadcrumb.Item>{this.props.title}</Breadcrumb.Item>
            </Breadcrumb>
          )}
          <div>{children}</div>
        </Layout.Content>
      </React.Fragment>
    );
  }
}
