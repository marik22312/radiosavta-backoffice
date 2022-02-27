import React from "react";
import { Image as AntImage } from "antd";
import { BASE_IMAGES_URL } from "../../config/constants.config";

export interface ImageProps {
  src?: string;
}
export const Image: React.FC<ImageProps> = (props) => {
  return <AntImage src={`${BASE_IMAGES_URL}/${props.src}`} />;
};
