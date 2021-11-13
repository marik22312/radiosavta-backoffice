import React from "react";
import { Result } from "antd";

export const NoPrograms: React.FC = () => {
  return (
    <Result
      status="404"
      title="No Programs For This Account"
      subTitle="Could not find any programs associated to your accound"
    />
  );
};
