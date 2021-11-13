import React from "react";
import { Avatar, Col, Typography } from "antd";
import { BASE_IMAGES_URL } from "../../../../config/constants.config";
import { IProgram } from "../../../../models/types";
import { useHistory } from "react-router";

export const ProgramTile: React.FC<IProgram> = (program) => {
  const history = useHistory();
  return (
    <Col onClick={() => history.push(`/programs/${program.id}`)}>
      <div>
        <Avatar
          shape="square"
          size={100}
          src={`${BASE_IMAGES_URL}/${program.cover_image}`}
          alt={program.name_en}
        >
          No Photo Available
        </Avatar>
      </div>
      <div>
        <Typography.Text strong>{program.name_en}</Typography.Text>
      </div>
    </Col>
  );
};
