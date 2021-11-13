import React from "react";
import { Card, Typography } from "antd";
import { BASE_IMAGES_URL } from "../../config/constants.config";
import { IProgram } from "../../models/types";
import { useHistory } from "react-router";
import styles from "./ProgramTile.module.scss";

export const ProgramTile: React.FC<IProgram> = (program) => {
  const history = useHistory();
  return (
    <Card
      onClick={() => history.push(`/programs/${program.id}`)}
      hoverable
      style={{ width: 240 }}
      cover={
        <img
          src={`${BASE_IMAGES_URL}/${program.cover_image}`}
          alt={program.name_en}
        />
      }
    >
      <Card.Meta title={program.name_en} />
    </Card>
    // <div
    //   onClick={() => history.push(`/programs/${program.id}`)}
    //   className={styles.programTileWrapper}
    // >
    //   <div className={styles.programImage}>
    //     <img
    //       src={`${BASE_IMAGES_URL}/${program.cover_image}`}
    //       alt={program.name_en}
    //     />
    //   </div>
    //   <div>
    //     <Typography.Text strong>{program.name_en}</Typography.Text>
    //   </div>
    // </div>
  );
};
