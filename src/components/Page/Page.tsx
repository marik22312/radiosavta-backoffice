import * as React from "react";
import { Layout, Breadcrumb, Typography, PageHeader } from "antd";
import { Link, useHistory } from "react-router-dom";

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
        <CustomPageHeader title={title} />
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

const CustomPageHeader: React.FC<{ title?: string }> = (props) => {
  const history = useHistory();

  return (
    <PageHeader
      className="site-page-header"
      onBack={() => history.goBack()}
      title={props.title}
    />
  );
};
