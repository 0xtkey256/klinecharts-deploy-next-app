// "use client";

// import type { CandleType, Chart } from "klinecharts";
// import { LineType, dispose, init } from "klinecharts";
// import { useEffect, useRef } from "react";
// import { generatedDataList } from "~/app/lib/utils";
// import Layout from "../Layout";

// const types = [
//   { key: "candle_solid", text: "Candle Solid" },
//   { key: "candle_stroke", text: "Candle Stroke" },
//   { key: "candle_up_stroke", text: "Candle Up Stroke" },
//   { key: "candle_down_stroke", text: "Candle Down Stroke" },
//   { key: "ohlc", text: "OHLC" },
//   { key: "area", text: "Area" },
// ];

// export default function ChartType() {
//   const chart = useRef<Chart | null>();

//   useEffect(() => {
//     chart.current = init("real-time-k-line", {
//       styles: { grid: { horizontal: { style: LineType.Dashed } } },
//     });
//     chart.current?.applyNewData(generatedDataList());
//     return () => {
//       dispose("real-time-k-line");
//     };
//   }, []);

//   return (
//     <Layout title="Chart Type">
//       <div id="real-time-k-line" className="k-line-chart" />
//       <div className="k-line-chart-menu-container">
//         {types.map(({ key, text }) => {
//           return (
//             <button
//               key={key}
//               onClick={() => {
//                 chart.current &&
//                   chart.current.setStyles({
//                     candle: {
//                       type: key as CandleType,
//                     },
//                   });
//               }}
//             >
//               {text}
//             </button>
//           );
//         })}
//       </div>
//     </Layout>
//   );
// }

"use client";

import type { CandleType, Chart } from "klinecharts";
import { LineType, dispose, init } from "klinecharts";
import { useEffect, useRef } from "react";
import { generatedDataList } from "~/app/lib/utils";
import Layout from "../Layout";

const types = [
  { key: "candle_solid", text: "Solid" },
  { key: "candle_stroke", text: "Stroke" },
  { key: "candle_up_stroke", text: "Up Stroke" },
  { key: "candle_down_stroke", text: "Down Stroke" },
  { key: "ohlc", text: "OHLC" },
  { key: "area", text: "Area" },
];

export default function ChartType() {
  const chart = useRef<Chart | null>();

  useEffect(() => {
    chart.current = init("real-time-k-line", {
      styles: { grid: { horizontal: { style: LineType.Dashed } } },
    });
    chart.current?.applyNewData(generatedDataList());
    return () => {
      dispose("real-time-k-line");
    };
  }, []);

  const updateChart = () => {
    chart.current?.applyNewData(generatedDataList());
  };

  return (
    <Layout title="Chart Type">
      <div id="real-time-k-line" className="k-line-chart" />
      <div className="k-line-chart-menu-container">
        {types.map(({ key, text }) => {
          return (
            <button
              key={key}
              onClick={() => {
                chart.current &&
                  chart.current.setStyles({
                    candle: {
                      type: key as CandleType,
                    },
                  });
              }}
            >
              {text}
            </button>
          );
        })}
        <button onClick={updateChart}>Update</button>
      </div>
    </Layout>
  );
}
