import React from "react";
import { Box } from "@mui/material";
import ReactApexChart from "react-apexcharts";

export default function Chart(props: any) {
  const { resource, title } = props;

  // Graphic's options
  const options = {
    chart: {
      type: "candlestick",
      height: 250,
      background: "#414040", // Couleur de fond blanche
      color:"#F4733A"
    },
    title: {
      text: title,
      align: "left",
      style: {
        color:"white"
      }
    },
    xaxis: {
      type: "datetime",
      labels: {
        style: {
          colors: "#F4733A",
        },
      },
    },
    yaxis: {
      tooltip: {
        enabled: true,
        style: {
          fontSize: "14px",
        },
      },
      labels: {
        style: {
          colors: "#F4733A",
        },
      },
    },
    grid:{
      borderColor:"#F4733A"
    },
    legend: {
      show: false,
    },
    theme: {
      mode: 'dark'
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
    <Box width="800px" style={{ color: "#000000" }}>
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
