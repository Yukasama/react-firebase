import {
  Chart,
  LinearScale,
  Filler,
  CategoryScale,
  PointElement,
  LineElement,
  BarElement,
  ScriptableContext,
  Tooltip,
  Legend,
} from "chart.js";
import { useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { corsairPlugin } from "./ChartConfig";
import { chartOptions } from "./ChartConfig";

Chart.register(
  LinearScale,
  CategoryScale,
  Filler,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
);

interface ChartProps {
  title?: string;
  labels: string[];
  data: {}[];
  loading?: boolean;
}

export const PriceChart: React.FC<ChartProps> = (config) => {
  const timeFrames = ["1D", "5D", "1M", "6M", "1Y", "5Y", "ALL"];
  const [time, setTime] = useState("1D");

  const data = {
    labels: config.labels,
    datasets: config.data.map((c: any) => ({
      label: c.label,
      data: c.data,
      backgroundColor: (context: ScriptableContext<"line">) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 260);
        gradient.addColorStop(0, `rgba(${c.color}, 0.3)`);
        gradient.addColorStop(1, `rgba(${c.color}, 0)`);
        return gradient;
      },
      borderColor: `rgb(${c.color})`,
      pointRadius: c.pointRadius,
      pointHitRadius: c.pointHitRadius,
      pointBorderWidth: c.pointBorderWidth,
      pointBorderColor: `white`,
      pointBackgroundColor: `rgb(${c.color})`,
      pointHoverBorderWidth: c.pointHoverBorderWidth,
      pointHoverRadius: c.pointHoverRadius,
      fill: c.fill,
    })),
  };

  return (
    <div className="w-[700px] bg-sun-300 dark:bg-moon-400 rounded-lg animate-appear-up">
      {config.loading ? (
        <div
          role="status"
          className="w-full p-4 rounded shadow animate-pulse md:p-6">
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2.5"></div>
          <div className="w-48 h-2 mb-10 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          <div className="flex items-baseline mt-4 space-x-6">
            <div className="w-full bg-gray-200 rounded-t-lg h-72 dark:bg-gray-700"></div>
            <div className="w-full h-56 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
            <div className="w-full bg-gray-200 rounded-t-lg h-72 dark:bg-gray-700"></div>
            <div className="w-full h-64 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
            <div className="w-full bg-gray-200 rounded-t-lg h-80 dark:bg-gray-700"></div>
            <div className="w-full bg-gray-200 rounded-t-lg h-72 dark:bg-gray-700"></div>
            <div className="w-full bg-gray-200 rounded-t-lg h-80 dark:bg-gray-700"></div>
          </div>
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div>
          <div className="flex justify-end items-center pt-5 pr-5 p-2">
            <div className="h-[30px] gap-1 flex items-center rounded-md dark:bg-moon-400 dark:text-sun-400">
              {timeFrames.map((frame, i) => (
                <div
                  key={i}
                  onClick={() => setTime(frame)}
                  className={`w-[34px] h-full rounded-md flex-box 
                text-[13px] cursor-pointer ${
                  time === frame
                    ? "bg-blue-500 dark:bg-blue-500 text-sun-100"
                    : "bg-sun-400 dark:bg-moon-200"
                }`}>
                  {frame}
                </div>
              ))}
            </div>
          </div>
          <Line
            className="w-[700px] px-[15px] h-[350px]"
            data={data}
            options={chartOptions("price")}
            plugins={[corsairPlugin]}
          />
        </div>
      )}
    </div>
  );
};

export const LineChart: React.FC<ChartProps> = (config) => {
  const data = {
    labels: config.labels,
    datasets: config.data.map((c: any) => ({
      label: c.label,
      data: c.data,
      backgroundColor: (context: ScriptableContext<"line">) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 260);
        gradient.addColorStop(0, `rgba(${c.color}, 0.3)`);
        gradient.addColorStop(1, `rgba(${c.color}, 0)`);
        return gradient;
      },
      borderColor: `rgb(${c.color})`,
      pointRadius: c.pointRadius,
      pointHitRadius: c.pointHitRadius,
      pointBorderWidth: c.pointBorderWidth,
      pointBorderColor: `white`,
      pointBackgroundColor: `rgb(${c.color})`,
      pointHoverBorderWidth: c.pointHoverBorderWidth,
      pointHoverRadius: c.pointHoverRadius,
      fill: c.fill,
    })),
  };

  return (
    <div className="bg-sun-300 dark:bg-moon-400 rounded-lg min-w-[500px] flex-1 px-6 p-3 animate-appear-up">
      <p className="text-[19px] font-medium mb-1">{config.title}</p>
      <div className="flex ml-0.5 gap-4">
        {config.data.map((c: any) => (
          <div
            key={config.title + c.label}
            className="flex items-center gap-[5px]">
            <div
              className={`w-[15px] h-[15px] rounded-full`}
              style={{
                backgroundColor: `rgb(${c.color.split(",")[0]}, ${
                  c.color.split(",")[1]
                }, ${c.color.split(",")[2]})`,
              }}></div>
            <p className="text-[14px] font-thin">{c.label}</p>
          </div>
        ))}
      </div>
      <Line
        className="hover:scale-[1.01] transition-transform duration-[0.35s] max-w-full"
        data={data}
        options={chartOptions("line")}
      />
    </div>
  );
};

export const BarChart: React.FC<ChartProps> = (config) => {
  const data = {
    labels: config.labels,
    datasets: config.data.map((c: any) => ({
      label: c.label,
      data: c.data,
      backgroundColor: (context: ScriptableContext<"bar">) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 260);
        gradient.addColorStop(0, `rgba(${c.color}, 0.5)`);
        gradient.addColorStop(1, `rgba(${c.color}, 0.2)`);
        return gradient;
      },
      borderColor: `rgb(${c.color})`,
      borderWidth: 3,
      fill: c.fill,
    })),
  };

  return (
    <div className="bg-sun-300 dark:bg-moon-400 rounded-lg min-w-[500px] flex-1 px-6 p-3 animate-appear-up">
      <p className="text-[19px] font-medium mb-1">{config.title}</p>
      <div className="flex ml-0.5 gap-4">
        {config.data.map((c: any) => (
          <div key={config.title + c.label} className="flex items-center gap-1">
            <div
              className={`w-[15px] h-[15px] rounded-full`}
              style={{
                backgroundColor: `rgb(${c.color.split(",")[0]}, ${
                  c.color.split(",")[1]
                }, ${c.color.split(",")[2]})`,
              }}></div>
            <p className="text-[14px] font-thin">{c.label}</p>
          </div>
        ))}
      </div>
      <Bar
        className="hover:scale-[1.01] transition-transform duration-[0.35s]"
        data={data}
        options={chartOptions("bar")}
      />
    </div>
  );
};
