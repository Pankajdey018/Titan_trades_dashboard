import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { baseOptions } from "../theme/chartConfig.js";
import { chartTheme } from "../theme/theme.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

export function VerticalGraph({ data, title }) {
  const options = {
    ...baseOptions,
    plugins: {
      ...baseOptions.plugins,
      title: {
        display: !!title,
        text: title,
        align: "start", // 🔥 Stripe style (left aligned)
        color: chartTheme.title,
        font: {
          size: 14,
          weight: "600",
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: chartTheme.text,
          font: { size: 11 },
        },
      },
      y: {
        grid: {
          color: chartTheme.grid,
          drawBorder: false,
        },
        ticks: {
          color: chartTheme.text,
          callback: (val) => `₹${val / 1000}k`,
        },
      },
    },
    elements: {
      bar: {
        borderRadius: 8,
        backgroundColor: chartTheme.colors[0],
        hoverBackgroundColor: "#6366F1",
      },
    },
  };

  return (
    <div style={{ height: "320px" }}>
      <Bar options={options} data={data} />
    </div>
  );
}