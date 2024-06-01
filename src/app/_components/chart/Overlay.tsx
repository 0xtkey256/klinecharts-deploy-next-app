"use client";

import type { Chart } from "klinecharts";
import { dispose, init, registerOverlay } from "klinecharts";
import { useEffect, useRef } from "react";
import { generatedDataList } from "~/app/lib/utils";
import Layout from "../Layout";

registerOverlay({
  name: "circle",
  needDefaultPointFigure: true,
  needDefaultXAxisFigure: true,
  needDefaultYAxisFigure: true,
  totalStep: 3,
  createPointFigures: function ({ coordinates }) {
    if (coordinates.length === 2) {
      const xDis = Math.abs(coordinates[0].x - coordinates[1].x);
      const yDis = Math.abs(coordinates[0].y - coordinates[1].y);
      const radius = Math.sqrt(xDis * xDis + yDis * yDis);
      return {
        key: "circle",
        type: "circle",
        attrs: {
          ...coordinates[0],
          r: radius,
        },
        styles: {
          style: "stroke_fill",
        },
      };
    }
    return [];
  },
});

const overlays = [
  { key: "priceLine", text: "Built-in Price Line" },
  { key: "circle", text: "Custom Circle" },
];

export default function DrawGraphMarkKLineChart() {
  const chart = useRef<Chart | null>();
  useEffect(() => {
    chart.current = init("overlay-k-line");
    chart.current?.applyNewData(generatedDataList());
    return () => {
      dispose("overlay-k-line");
    };
  }, []);

  const updateChart = () => {
    chart.current?.applyNewData(generatedDataList());
  };

  return (
    <Layout title="Overlays">
      <div id="overlay-k-line" className="k-line-chart" />
      <div className="k-line-chart-menu-container">
        <button
          onClick={() => {
            const dataList = chart.current?.getDataList() ?? [];
            const data = dataList[dataList.length - 20];
            chart.current?.createOverlay({
              name: "simpleAnnotation",
              extendData: "Annotation",
              points: [{ timestamp: data.timestamp, value: data.high }],
            });
          }}
        >
          Built-in Annotation
        </button>
        <button
          onClick={() => {
            const dataList = chart.current?.getDataList() ?? [];
            const data = dataList[dataList.length - 10];
            chart.current?.createOverlay({
              name: "simpleTag",
              extendData: "Tag",
              points: [{ value: data.high }],
            });
          }}
        >
          Built-in Tag
        </button>
        {overlays.map(({ key, text }) => {
          return (
            <button
              key={key}
              onClick={() => {
                chart.current?.createOverlay(key);
              }}
            >
              {text}
            </button>
          );
        })}
        <button
          onClick={() => {
            chart.current?.removeOverlay();
          }}
        >
          Clear
        </button>
        <button onClick={updateChart} style={{ marginLeft: 20 }}>
          Update
        </button>
      </div>
    </Layout>
  );
}
