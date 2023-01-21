import React, { useMemo, useState } from "react";
import { Result } from "antd";
import { Line } from "@ant-design/charts";
import { ResponseData } from "../../domain/Statistics";
import { usePlayLiveStats } from "./usePlayLiveStats";
import Loader from "react-loader-spinner";

interface lineChartItem {
  date: string;
  value: number;
  broadcaster: string;
}

function mapResponseToChart(item?: ResponseData): lineChartItem[] {
  const options: Intl.DateTimeFormatOptions = {
    month: "numeric",
    day: "numeric",
  };

  if (!item) {
    return [];
  }

  const arr: lineChartItem[] = [];
  Object.keys(item).forEach((broadcaster) => {
    Object.keys(item[broadcaster]).forEach((date) => {
      arr.push({
        broadcaster,
        value: item[broadcaster][date],
        date: new Intl.DateTimeFormat("en-GB", options).format(new Date(date)),
      });
    });
  });
  return arr;
}

export const ListenerStatistics: React.FC = () => {
  const { data, isLoading } = usePlayLiveStats();

  const statistics = useMemo(() => mapResponseToChart(data), [data]);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Loader />
        <p>Loading...</p>
      </div>
    );
  }

  if (!statistics.length) {
    return <Result status="error" title="Something went wrong" />;
  }

  const config = {
    data: statistics,
    xField: "date",
    yField: "value",
    seriesField: "broadcaster",
    color: ["#7856FF", "#FF7557", "#80E1D9", "#F8BC3B", "#B2596E", "#72BEF4"],
  };

  return <Line {...config} />;
};
