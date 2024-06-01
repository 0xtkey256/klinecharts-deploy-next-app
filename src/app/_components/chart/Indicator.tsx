"use client";

import type { Chart } from "klinecharts";
import { dispose, init, registerIndicator } from "klinecharts";
import { useEffect, useRef } from "react";
import { generatedDataList } from "~/app/lib/utils";
import Layout from "../Layout";

const fruits = [
  "🍏",
  "🍎",
  "🍐",
  "🍊",
  "🍋",
  "🍌",
  "🍉",
  "🍇",
  "🍓",
  "🍈",
  "🍒",
  "🍑",
  "🍍",
  "🥥",
  "🥝",
  "🥭",
  "🥑",
  "🍏",
];

interface EmojiEntity {
  emoji: number;
  text: string;
}

// Custom indicator
registerIndicator<EmojiEntity>({
  name: "EMOJI",
  figures: [{ key: "emoji" }],
  calc: (kLineDataList) => {
    return kLineDataList.map((kLineData) => ({
      emoji: kLineData.close,
      text: fruits[Math.floor(Math.random() * 17)],
    }));
  },
  draw: ({ ctx, barSpace, visibleRange, indicator, xAxis, yAxis }) => {
    const { from, to } = visibleRange;

    ctx.font = `${barSpace.gapBar}px Helvetica Neue`;
    ctx.textAlign = "center";
    const result = indicator.result;
    for (let i = from; i < to; i++) {
      const data = result[i];
      const x = xAxis.convertToPixel(i);
      const y = yAxis.convertToPixel(data.emoji);
      ctx.fillText(data.text, x, y);
    }
    return false;
  },
});

const mainIndicators = ["MA", "EMA", "SAR"];
const subIndicators = ["VOL", "MACD", "KDJ"];

export default function Indicator() {
  const chart = useRef<Chart | null>();
  const paneId = useRef<string>("");

  useEffect(() => {
    chart.current = init("indicator-k-line");
    paneId.current = chart.current?.createIndicator("VOL", false) ?? "";
    chart.current?.applyNewData(generatedDataList());
    return () => {
      dispose("indicator-k-line");
    };
  }, []);

  const updateChart = () => {
    chart.current?.applyNewData(generatedDataList());
  };

  return (
    <Layout title="Technical Indicators">
      <div id="indicator-k-line" className="k-line-chart" />
      <div
        className="k-line-chart-menu-container"
        style={{ display: "flex", flexWrap: "wrap" }}
      >
        <span style={{ paddingRight: 10 }}>Main Indicators</span>
        {mainIndicators.map((type) => {
          return (
            <button
              key={type}
              onClick={() => {
                chart.current?.createIndicator(type, false, {
                  id: "candle_pane",
                });
              }}
            >
              {type}
            </button>
          );
        })}
        <button
          onClick={() => {
            chart.current?.createIndicator("EMOJI", true, {
              id: "candle_pane",
            });
          }}
        >
          Custom
        </button>
        <span style={{ paddingRight: 10, paddingLeft: 12 }}>
          Sub Indicators
        </span>
        {subIndicators.map((type) => {
          return (
            <button
              key={type}
              onClick={() => {
                chart.current?.createIndicator(type, false, {
                  id: paneId.current,
                });
              }}
            >
              {type}
            </button>
          );
        })}
        <button
          onClick={() => {
            chart.current?.createIndicator("EMOJI", false, {
              id: paneId.current,
            });
          }}
        >
          Custom
        </button>
        <button onClick={updateChart} style={{ marginLeft: 20 }}>
          Update
        </button>
      </div>
    </Layout>
  );
}
