import React from "react";

import { Table } from "antd";
import { useProgramById } from "../../../../../hooks/usePgoramById";
import Loader from "react-loader-spinner";
import { RecordedShow } from "../../../../../domain/RecordedShow";
import { IFullProgram } from "../../../../../models/types";

import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const SourceColumn: React.FC<{ source?: string }> = ({ source }) => {
  if (!source) {
    return <span style={{ color: "red" }}>MIXCLOUD</span>;
  }
  return <span>{source}</span>;
};

const columns = [
  { title: "Recording ID", dataIndex: "id" },
  { title: "Name", dataIndex: "name" },
  {
    title: "file source",
    dataIndex: "source",
    // eslint-disable-next-line
    render: (text: string) => <SourceColumn source={text} />,
  },
  { title: "status", dataIndex: "status" },
  {
    title: "Actions",
    // eslint-disable-next-line
    render: (text: string, src: RecordedShow | any) => <a href={src.url} target="_blank" rel="noreferrer noopener">Open <FontAwesomeIcon icon={faExternalLinkAlt} /></a>,
    fixed: true,
  },
];

export const RecordedShowsTable: React.FC<{ programId: string }> = (props) => {
  const { program, isLoading } = useProgramById(props.programId);

  if (!program) {
    return <Loader />;
  }
  return (
    <Table
      loading={isLoading}
      columns={columns}
      dataSource={[...program!.recorded_shows_ng, ...program!.recorded_shows]}
    ></Table>
  );
};
