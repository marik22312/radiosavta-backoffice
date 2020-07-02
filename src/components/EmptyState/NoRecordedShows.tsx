import React from "react";
import { Empty, Button } from "antd";

export const NoRecordedShows = () => (
  <Empty
    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
    imageStyle={{
      height: 60,
    }}
    style={{ width: "100%" }}
    description={<span>This program has no recorded shows yet =(</span>}
  >
    <Button type="primary">Create Now</Button>
  </Empty>
);
