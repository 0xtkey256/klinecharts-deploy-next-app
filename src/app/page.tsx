import ChartType from "./_components/chart/ChartType";
import Indicator from "./_components/chart/Indicator";
import Language from "./_components/chart/Language";
import LoadMore from "./_components/chart/LoadMore";
import Overlay from "./_components/chart/Overlay";
import Theme from "./_components/chart/Theme";
import Timezone from "./_components/chart/Timezone";
import Tooltip from "./_components/chart/Tooltip";
import Update from "./_components/chart/Update";
import YAxis from "./_components/chart/YAxis";

export default function Home() {
  return (
    <div className="app">
      <ChartType />
      <Theme />
      <YAxis />
      <Language />
      <Tooltip />
      <Timezone />
      <Indicator />
      <Overlay />
      <LoadMore />
      <Update />
    </div>
  );
}
