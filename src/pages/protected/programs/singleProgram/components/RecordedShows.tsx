import React from "react";

import { Table } from "antd";
import { useProgramById } from "../../../../../hooks/usePgoramById";
import Loader from "react-loader-spinner";
import { RecordedShow } from "../../../../../domain/RecordedShow";
import { MoreActions } from "./MoreActions";

const columns = [
  { title: "Recording ID", dataIndex: "id" },
  { title: "Name", dataIndex: "name" },
  {
    title: "Upload Date",
    dataIndex: "created_at",
    render: (text: string) => Intl.DateTimeFormat("he").format(new Date(text)),
  },
  { title: "Status", dataIndex: "status" },
  {
    title: "Actions",
    // eslint-disable-next-line
    render: (text: string, src: RecordedShow | any) => <MoreActions recordedShowId={src.id}/>,
    fixed: true,
  },
];

export const RecordedShowsTable: React.FC<{ programId: string }> = (props) => {
  const { program, isLoading } = useProgramById(props.programId);

  if (!program) {
    return <Loader />;
  }
  return (
    <>
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={[...program!.recorded_shows_ng, ...program!.recorded_shows]}
      />
    </>
  );
};
