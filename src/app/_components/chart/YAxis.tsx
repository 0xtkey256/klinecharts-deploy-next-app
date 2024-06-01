"use client";

import type { Chart, YAxisType } from "klinecharts";
import { dispose, init } from "klinecharts";
import { useEffect, useRef, useState } from "react";
import { generatedDataList } from "~/app/lib/utils";
import Layout from "../Layout";

const types = [
  { key: "normal", text: "Linear Axis" },
  { key: "percentage", text: "Percentage Axis" },
  { key: "log", text: "Logarithmic Axis" },
];

export default function CustomThemeKLineChart() {
  const chart = useRef<Chart | null>();
  const [type, setType] = useState("normal");

  useEffect(() => {
    chart.current = init("y-axis-k-line");
    chart.current?.applyNewData(generatedDataList());
    return () => {
      dispose("y-axis-k-line");
    };
  }, []);

  useEffect(() => {
    chart.current?.setStyles({
      yAxis: { type: type as YAxisType },
    });
  }, [type]);

  const updateChart = () => {
    chart.current?.applyNewData(generatedDataList());
  };

  return (
    <Layout title="Y-Axis">
      <div id="y-axis-k-line" className="k-line-chart" />
      <div className="k-line-chart-menu-container">
        {types.map(({ key, text }) => {
          return (
            <button
              key={key}
              onClick={() => {
                setType(key);
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
