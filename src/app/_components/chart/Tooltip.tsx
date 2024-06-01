"use client";

import type {
  CandleTooltipCustomCallbackData,
  Chart,
  TooltipShowRule,
  TooltipShowType,
} from "klinecharts";
import { dispose, init } from "klinecharts";
import { useEffect, useRef, useState } from "react";
import { generatedDataList } from "~/app/lib/utils";
import Layout from "../Layout";

function getTooltipOptions(
  candleShowType: TooltipShowType,
  candleShowRule: TooltipShowRule,
  indicatorShowRule: TooltipShowRule,
) {
  return {
    candle: {
      tooltip: {
        showType: candleShowType,
        showRule: candleShowRule,
        custom: (data: CandleTooltipCustomCallbackData) => {
          const { prev, current } = data;
          const prevClose = prev?.close ?? current.open;
          const change = ((current.close - prevClose) / prevClose) * 100;
          return [
            { title: "Open", value: current.open.toFixed(2) },
            { title: "Close", value: current.close.toFixed(2) },
            {
              title: "Change: ",
              value: {
                text: `${change.toFixed(2)}%`,
                color: change < 0 ? "#EF5350" : "#26A69A",
              },
            },
          ];
        },
      },
    },
    indicator: {
      tooltip: {
        showRule: indicatorShowRule,
      },
    },
  };
}

const rules = [
  { key: "always", text: "Always Show" },
  { key: "follow_cross", text: "Follow Crosshair" },
  { key: "none", text: "Hide" },
];

export default function TooltipKLineChart() {
  const chart = useRef<Chart | null>();
  const [candleShowType, setCandleShowType] = useState("standard");
  const [candleShowRule, setCandleShowRule] = useState("always");
  const [indicatorShowRule, setIndicatorShowRule] = useState("always");

  useEffect(() => {
    chart.current = init("tooltip-k-line");
    chart.current?.createIndicator("MA", false, { id: "candle_pane" });
    chart.current?.createIndicator("KDJ", false, { height: 80 });
    chart.current?.applyNewData(generatedDataList());
    return () => {
      dispose("tooltip-k-line");
    };
  }, []);

  useEffect(() => {
    chart.current?.setStyles(
      getTooltipOptions(
        candleShowType as TooltipShowType,
        candleShowRule as TooltipShowRule,
        indicatorShowRule as TooltipShowRule,
      ),
    );
  }, [candleShowType, candleShowRule, indicatorShowRule]);

  const updateChart = () => {
    chart.current?.applyNewData(generatedDataList());
  };

  return (
    <Layout title="Crosshair Tooltip">
      <div id="tooltip-k-line" className="k-line-chart" />
      <div className="k-line-chart-menu-container">
        <span style={{ paddingRight: 10 }}>Candle Tooltip Show Type</span>
        <button
          onClick={() => {
            setCandleShowType("standard");
          }}
        >
          Standard
        </button>
        <button
          onClick={() => {
            setCandleShowType("rect");
          }}
        >
          Rectangular Box
        </button>
      </div>
      <div className="k-line-chart-menu-container">
        <span style={{ paddingRight: 10 }}>Candle Tooltip Show Rule</span>
        {rules.map(({ key, text }) => {
          return (
            <button
              key={key}
              onClick={() => {
                setCandleShowRule(key as TooltipShowRule);
              }}
            >
              {text}
            </button>
          );
        })}
      </div>
      <div className="k-line-chart-menu-container">
        <span style={{ paddingRight: 10 }}>Indicator Tooltip Show Rule</span>
        {rules.map(({ key, text }) => {
          return (
            <button
              key={key}
              onClick={() => {
                setIndicatorShowRule(key as TooltipShowRule);
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
