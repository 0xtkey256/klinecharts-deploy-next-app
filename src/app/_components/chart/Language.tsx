"use client";

import type { Chart } from "klinecharts";
import { dispose, init, registerLocale } from "klinecharts";
import { useEffect, useRef, useState } from "react";
import { generatedDataList } from "~/app/lib/utils";
import Layout from "../Layout";

registerLocale("en-US", {
  time: "Time:",
  open: "Open:",
  high: "High:",
  low: "Low:",
  close: "Close:",
  volume: "Volume:",
  change: "Change:",
  turnover: "Turnover:",
});

const locals = [
  { key: "en-US", text: "English" },
  { key: "zh-CN", text: "简体中文" },
  { key: "zh-HK", text: "繁体中文" },
];

export default function Language() {
  const chart = useRef<Chart | null>();
  const [language, setLanguage] = useState("en-US");

  useEffect(() => {
    chart.current = init("language-k-line");
    chart.current?.applyNewData(generatedDataList());
    return () => {
      dispose("language-k-line");
    };
  }, []);

  useEffect(() => {
    chart.current && chart.current.setLocale(language);
  }, [language]);

  const updateChart = () => {
    chart.current?.applyNewData(generatedDataList());
  };

  return (
    <Layout title="Multi-language">
      <div id="language-k-line" className="k-line-chart" />
      <div className="k-line-chart-menu-container">
        {locals.map(({ key, text }) => {
          return (
            <button
              key={key}
              onClick={() => {
                setLanguage(key);
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
