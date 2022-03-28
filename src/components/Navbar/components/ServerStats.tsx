import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "antd";
import { useStreamInfo } from "../hooks/userServerStats";

import ServerStatsStyle from "./ServerStats.module.scss";
import {
  faBroadcastTower,
  faCompactDisc,
  faHeadphones,
} from "@fortawesome/free-solid-svg-icons";

export const ServerStats: React.FC = () => {
  const { streamInfo } = useStreamInfo();
  return (
    <div className={ServerStatsStyle.serverStatsWrapper}>
      <div className={ServerStatsStyle.stat} title="Stream source">
        <Tooltip placement="bottom" title="Stream source">
          <FontAwesomeIcon
            size="2x"
            icon={
              streamInfo?.isLive
                ? (faBroadcastTower as any)
                : (faCompactDisc as any)
            }
          />{" "}
          {streamInfo?.isLive ? "Live" : "Auto DJ"}
        </Tooltip>
      </div>
      <div className={ServerStatsStyle.stat} title="Live Listeners">
        <Tooltip placement="bottom" title="Live Listeners Count">
          <FontAwesomeIcon
            size="2x"
            icon={faHeadphones as any}
            color="#ffffff"
          />{" "}
          {streamInfo?.listeners} Live Listeners
        </Tooltip>
      </div>
      {/* // TODO: Fix playing state so it wont "pause"  */}
      {/* <div className={ServerStatsStyle.stat} title="Live Listeners">
		  <audio
			className={ServerStatsStyle.livePlayer}
			src={LIVE_STREAM_URL}
			controls
		  />
		</div> */}
    </div>
  );
};
