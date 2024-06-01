"use client";

import type { Chart } from "klinecharts";
import { dispose, init } from "klinecharts";
import { useEffect, useRef } from "react";
import { generatedDataList } from "~/app/lib/utils";
import Layout from "../Layout";

const timezones = [
  { key: "Asia/Shanghai", text: "Shanghai" },
  { key: "Europe/Berlin", text: "Berlin" },
  { key: "America/Chicago", text: "Chicago" },
];

export default function Timezone() {
  const chart = useRef<Chart | null>();
  useEffect(() => {
    chart.current = init("timezone-k-line");
    chart.current?.applyNewData(generatedDataList());
    return () => {
      dispose("timezone-k-line");
    };
  }, []);

  const updateChart = () => {
    chart.current?.applyNewData(generatedDataList());
  };

  return (
    <Layout title="Timezone Settings">
      <div id="timezone-k-line" className="k-line-chart" />
      <div className="k-line-chart-menu-container">
        {timezones.map(({ key, text }) => {
          return (
            <button
              key={key}
              onClick={() => {
                chart.current && chart.current.setTimezone(key);
              }}
            >
              {text}
            </button>
          );
        })}
        <button onClick={updateChart} style={{ marginLeft: 20 }}>
          Update
        </button>
      </div>
    </Layout>
  );
}
