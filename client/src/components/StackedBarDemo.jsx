import React, { useEffect, useRef, useState } from "react";

import { Chart } from "primereact/chart";

export default function StackedBarDemo() {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color").trim();
    const textColorSecondary = documentStyle
      .getPropertyValue("--text-color-secondary")
      .trim();
    const surfaceBorder = documentStyle
      .getPropertyValue("--surface-border")
      .trim();

    const data = {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      datasets: [
        {
          type: "bar",
          label: "RES Earnings",
          backgroundColor: documentStyle.getPropertyValue("--blue-500").trim(),
          data: [
            1500, 1700, 1200, 1800, 2000, 2200, 2100, 1900, 1800, 1600, 1700,
            2000,
          ],
        },
        {
          type: "bar",
          label: "GES Earnings",
          backgroundColor: documentStyle.getPropertyValue("--green-500").trim(),
          data: [
            1400, 1600, 1300, 1900, 2100, 2300, 2200, 2000, 1900, 1700, 1800,
            2100,
          ],
        },
        {
          type: "bar",
          label: "Yapay Mania",
          backgroundColor: documentStyle
            .getPropertyValue("--yellow-500")
            .trim(),
          data: [
            1300, 1500, 1400, 1700, 1900, 2000, 1800, 1700, 1600, 1500, 1400,
            1700,
          ],
        },
      ],
    };

    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        tooltip: {
          mode: "index",
          intersect: false,
        },
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          stacked: true,
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          stacked: true,
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  return (
    <Chart className="bar" type="bar" data={chartData} options={chartOptions} />
  );
}
