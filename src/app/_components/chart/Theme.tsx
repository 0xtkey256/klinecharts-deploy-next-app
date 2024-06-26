"use client";

import type { Chart } from "klinecharts";
import { dispose, init } from "klinecharts";
import { useEffect, useRef, useState } from "react";
import { generatedDataList } from "~/app/lib/utils";
import Layout from "../Layout";
const themes = [
  { key: "dark", text: "Dark Mode" },
  { key: "light", text: "Light Mode" },
];

const TimestampTag = () => {
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    const generateTimestamp = () => {
      const now = new Date();
      const randomTimestamp = new Date(
        now.getTime() - Math.random() * 86400000,
      );
      setTimestamp(randomTimestamp.toString());
    };

    generateTimestamp();
  }, []);

  return (
    <a
      href="https://www.google.com"
      target="_blank"
      style={{ textDecoration: "none" }}
    >
      <div style={{ color: "red", cursor: "pointer" }}>
        Random Timestamp: {timestamp}
      </div>
    </a>
  );
};
export default function CustomThemeKLineChart() {
  const chart = useRef<Chart | null>();
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    chart.current = init("style-k-line");
    chart.current?.applyNewData(generatedDataList());
    return () => {
      dispose("style-k-line");
    };
  }, []);

  useEffect(() => {
    chart.current?.setStyles(theme);
  }, [theme]);

  const updateChart = () => {
    chart.current?.applyNewData(generatedDataList());
  };

  return (
    <Layout title="Main">
      <div
        id="style-k-line"
        style={theme === "dark" ? { backgroundColor: "#1f2126" } : {}}
        className="k-line-chart"
      />
      <div className="k-line-chart-menu-container">
        {themes.map(({ key, text }) => {
          return (
            <button
              key={key}
              onClick={() => {
                setTheme(key);
              }}
            >
              {text}
            </button>
          );
        })}
        <button onClick={updateChart} style={{ marginLeft: 20 }}>
          Update
        </button>
        <TimestampTag /> {/* Include the TimestampTag component */}
      </div>
    </Layout>
  );
}
