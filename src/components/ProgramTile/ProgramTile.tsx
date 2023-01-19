import React from "react";
import { Card, Typography } from "antd";
import { BASE_IMAGES_URL } from "../../config/constants.config";
import { IProgram } from "../../models/types";
import { useHistory } from "react-router";
import styles from "./ProgramTile.module.scss";

interface ProgramTileProps extends IProgram {
  onClick?: () => void;
}
export const ProgramTile: React.FC<ProgramTileProps> = (props) => {
  const history = useHistory();

  const onClickProgram = () => {
    props.onClick?.();
    history.push(`/programs/${props.id}`);
  };
  return (
    <Card
      onClick={onClickProgram}
      hoverable
      style={{ width: 240 }}
      cover={
        <img
          src={`${BASE_IMAGES_URL}/${props.cover_image}`}
          alt={props.name_en}
        />
      }
    >
      <Card.Meta title={props.name_en} />
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
