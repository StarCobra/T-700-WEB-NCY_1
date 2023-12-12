import React from "react";
import { Box } from "@mui/material";
import ReactApexChart from "react-apexcharts";

export default function Chart(props: any) {
  const { resource, title } = props;

  // Graphic's options
  const options = {
    chart: {
      type: "candlestick",
      height: 350,
      background: "#b7b7b7", // Couleur de fond blanche
    },
    title: {
      text: title,
      align: "left",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
        style: {
          fontSize: "14px",
          color: "#000000",
        },
      },
    },
    legend: {
      show: false,
    },
  };

  const data = resource.map((item: any, index: number) => ({
    x: new Date(1538785000000 + index * 86400000),
    y: [
      item?.change_price_day, // Open price
      item?.current_price, // Close price
      item?.highest_price_day, // Highest price
      item?.lowest_price_day, // Lowest price
    ],
  }));

  return (
    <Box width="600px" style={{ color: "#000000" }}>
      <ReactApexChart
        // eslint-disable-next-line
        // @ts-ignore
        options={options}
        series={[{ data }]}
        type="candlestick"
      />
    </Box>
  );
}
