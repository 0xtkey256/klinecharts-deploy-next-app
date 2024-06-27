import type { KLineData } from "klinecharts";

// Function to generate random data for K-line chart
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
    const readableTimestamp = new Date(timestamp).toLocaleString(); // Human-readable timestamp
    const kLineData: KLineData = {
      open: prices[openIdx],
      low: prices[0],
      high: prices[3],
      close: prices[closeIdx],
      volume: volume,
      timestamp,
      readableTimestamp, // Add readable timestamp
    };
    timestamp -= 60 * 1000;
    kLineData.turnover =
      ((kLineData.open + kLineData.close + kLineData.high + kLineData.low) /
        4) *
      volume;
    dataList.unshift(kLineData);
  }

  // Call function to display random icon after generating data
  displayRandomIcon();

  return dataList;
}

// Function to display a random icon at a fixed position
function displayRandomIcon() {
  const icon = document.createElement("div");
  icon.className = "fixed-icon"; // Add a unique class name
  icon.innerHTML = "⭐"; // Example icon (you can customize this)
  icon.style.position = "fixed";
  icon.style.top = "20vh"; // Fixed vertical position
  icon.style.right = "30vw"; // Fixed horizontal position
  icon.style.fontSize = "24px"; // Adjust icon size as needed
  icon.style.color = "#04AA6D"; // Green color
  icon.style.zIndex = "1000"; // Ensure it's on top of other elements
  icon.style.transition = "opacity 0.5s ease-in-out"; // Smooth fade-in effect
  // Add click event listener
  icon.addEventListener("click", () => {
    window.open("https://www.google.com", "_blank"); // Open a URL in a new tab
  });
  document.body.appendChild(icon);

  // Set timeout to remove icon after a fixed duration (e.g., 5 seconds)
  setTimeout(() => {
    icon.style.opacity = "0";
    setTimeout(() => {
      document.body.removeChild(icon);
    }, 500); // Wait for fade-out transition to complete
  }, 5000); // Fixed duration of 5 seconds
}
