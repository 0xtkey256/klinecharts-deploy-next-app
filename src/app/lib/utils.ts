// import type { KLineData } from "klinecharts";

// export function generatedDataList(
//   baseTimestamp?: number,
//   basePrice?: number,
//   dataSize?: number,
// ) {
//   const dataList: KLineData[] = [];
//   let timestamp =
//     Math.floor((baseTimestamp ?? Date.now()) / 60 / 1000) * 60 * 1000;
//   let baseValue = basePrice ?? 5000;
//   const length = dataSize ?? 800;
//   const prices = [];
//   for (let i = 0; i < length; i++) {
//     baseValue = baseValue + Math.random() * 20 - 10;
//     for (let j = 0; j < 4; j++) {
//       prices[j] = (Math.random() - 0.5) * 12 + baseValue;
//     }
//     prices.sort();
//     const openIdx = +Math.round(Math.random() * 3).toFixed(0);
//     let closeIdx = +Math.round(Math.random() * 2).toFixed(0);
//     if (closeIdx === openIdx) {
//       closeIdx++;
//     }
//     const volume = Math.random() * 50 + 10;
//     const kLineData: KLineData = {
//       open: prices[openIdx],
//       low: prices[0],
//       high: prices[3],
//       close: prices[closeIdx],
//       volume: volume,
//       timestamp,
//     };
//     timestamp -= 60 * 1000;
//     kLineData.turnover =
//       ((kLineData.open + kLineData.close + kLineData.high + kLineData.low) /
//         4) *
//       volume;
//     dataList.unshift(kLineData);
//   }
//   return dataList;
// }
import type { KLineData } from "klinecharts";

export function generatedDataList(
  baseTimestamp?: number,
  basePrice?: number,
  dataSize?: number,
): KLineData[] {
  const dataList: KLineData[] = [];
  let timestamp =
    Math.floor((baseTimestamp ?? Date.now()) / 60 / 1000) * 60 * 1000;
  let baseValue = basePrice ?? 5000;
  const length = dataSize ?? 800;
  const prices = [];
  for (let i = 0; i < length; i++) {
    baseValue = baseValue + Math.random() * 20 - 10;
    for (let j = 0; j < 4; j++) {
      prices[j] = (Math.random() - 0.5) * 12 + baseValue;
    }
    prices.sort();
    const openIdx = +Math.round(Math.random() * 3).toFixed(0);
    let closeIdx = +Math.round(Math.random() * 2).toFixed(0);
    if (closeIdx === openIdx) {
      closeIdx++;
    }
    const volume = Math.random() * 50 + 10;
    const kLineData: KLineData = {
      open: prices[openIdx],
      low: prices[0],
      high: prices[3],
      close: prices[closeIdx],
      volume: volume,
      timestamp,
    };
    timestamp -= 60 * 1000;
    kLineData.turnover =
      ((kLineData.open + kLineData.close + kLineData.high + kLineData.low) /
        4) *
      volume;
    dataList.unshift(kLineData);
  }
  return dataList;
}

function renderChart(dataList: KLineData[]) {
  const chartContainer = document.getElementById("chart-container");
  if (!chartContainer) {
    throw new Error("Chart container not found");
  }
  const chartWidth = chartContainer.clientWidth;
  const chartHeight = chartContainer.clientHeight;
  const maxTimestamp = Math.max(...dataList.map((d) => d.timestamp));
  const minTimestamp = Math.min(...dataList.map((d) => d.timestamp));
  const maxPrice = Math.max(...dataList.map((d) => d.high));
  const minPrice = Math.min(...dataList.map((d) => d.low));

  dataList.forEach((data) => {
    // Create a button for the high value
    const highButton = document.createElement("button");
    highButton.textContent = "High";
    highButton.style.position = "absolute";
    highButton.style.left = `${calculateXPosition(
      data.timestamp,
      minTimestamp,
      maxTimestamp,
      chartWidth,
    )}px`;
    highButton.style.top = `${calculateYPosition(
      data.high,
      minPrice,
      maxPrice,
      chartHeight,
    )}px`;
    highButton.onclick = () => (window.location.href = "https://coinpost.jp/");
    chartContainer.appendChild(highButton);

    // Create a button for the low value
    const lowButton = document.createElement("button");
    lowButton.textContent = "Low";
    lowButton.style.position = "absolute";
    lowButton.style.left = `${calculateXPosition(
      data.timestamp,
      minTimestamp,
      maxTimestamp,
      chartWidth,
    )}px`;
    lowButton.style.top = `${calculateYPosition(
      data.low,
      minPrice,
      maxPrice,
      chartHeight,
    )}px`;
    lowButton.onclick = () => (window.location.href = "https://coinpost.jp/");
    chartContainer.appendChild(lowButton);
  });
}

// Helper functions to calculate positions
function calculateXPosition(
  timestamp: number,
  minTimestamp: number,
  maxTimestamp: number,
  chartWidth: number,
): number {
  return (
    ((timestamp - minTimestamp) / (maxTimestamp - minTimestamp)) * chartWidth
  );
}

function calculateYPosition(
  value: number,
  minPrice: number,
  maxPrice: number,
  chartHeight: number,
): number {
  return (
    chartHeight - ((value - minPrice) / (maxPrice - minPrice)) * chartHeight
  );
}

// Ensure the script runs after the DOM has fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const dataList = generatedDataList();
  renderChart(dataList);
});
