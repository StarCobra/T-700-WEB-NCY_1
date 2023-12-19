import React from "react";
import CryptoArray from "../Crypto/Array";
import CryptoChart from "../Crypto/Chart";
import Select from "../Select";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Layout() {
  const [valueCrypto, setValueCrypto] = React.useState("bitcoin");

  // TODO : remplacer par valeur de l'API
  const options = [
    { value: "bitcoin", label: "BTC" },
    { value: "ethereum", label: "ETH" },
    { value: "solana", label: "SOL" },
  ];

  // TODO : remplacer par valeur de l'API
  const resource = [
    {
      id: "BTC",
      current_price: 50000,
      percent_price_day: 0.5,
      highest_price_day: 55000,
      lowest_price_day: 45000,
    },
    {
      id: "ETH",
      current_price: 5000,
      percent_price_day: 0.5,
      highest_price_day: 5500,
      lowest_price_day: 4500,
    },
    {
      id: "SOL",
      current_price: 500,
      percent_price_day: 0.5,
      highest_price_day: 550,
      lowest_price_day: 450,
    },
    {
      id: "ADA",
      current_price: 5,
      percent_price_day: 0.5,
      highest_price_day: 5.5,
      lowest_price_day: 4.5,
    },
    {
      id: "DOT",
      current_price: 50,
      percent_price_day: 0.5,
      highest_price_day: 55,
      lowest_price_day: 45,
    },
    {
      id: "LUNA",
      current_price: 50,
      percent_price_day: 0.5,
      highest_price_day: 55,
      lowest_price_day: 45,
    },
    {
      id: "LINK",
      current_price: 50,
      percent_price_day: 0.5,
      highest_price_day: 55,
      lowest_price_day: 45,
    },
  ];

  // TODO : remplacer par valeur de l'API
  const test = [
    {
      id: "BTC",
      change_price_day: 6629.81,
      current_price: 6650.5,
      highest_price_day: 6623.04,
      lowest_price_day: 6633.33,
    },
    {
      id: "BTC",
      change_price_day: 6610,
      current_price: 6600,
      highest_price_day: 6630,
      lowest_price_day: 6550,
    },
    {
      id: "BTC",
      change_price_day: 6629.81,
      current_price: 6650.5,
      highest_price_day: 6623.04,
      lowest_price_day: 6633.33,
    },
    {
      id: "BTC",
      change_price_day: 6610,
      current_price: 6600,
      highest_price_day: 6630,
      lowest_price_day: 6550,
    },
    {
      id: "BTC",
      change_price_day: 6629.81,
      current_price: 6650.5,
      highest_price_day: 6623.04,
      lowest_price_day: 6633.33,
    },
    {
      id: "BTC",
      change_price_day: 6610,
      current_price: 6600,
      highest_price_day: 6630,
      lowest_price_day: 6550,
    },
    {
      id: "BTC",
      change_price_day: 6629.81,
      current_price: 6650.5,
      highest_price_day: 6623.04,
      lowest_price_day: 6633.33,
    },
    {
      id: "BTC",
      change_price_day: 6610,
      current_price: 6600,
      highest_price_day: 6630,
      lowest_price_day: 6550,
    },
  ];

  return (
    <Box className="ArrayDisplay">
      <Box>
        <Select
          label="Select a crypto(s):"
          options={options}
          handleChange={(e: any) => setValueCrypto(e.target.value)}
        />

        <Button>
          <Link to={"/preferences"}>Update preferences</Link>
        </Button>
      </Box>

      <CryptoChart
        resource={test}
        title={
          valueCrypto !== ""
            ? `CandleStick of ${valueCrypto}`
            : "Select a crypto"
        }
      />

      <Box>
        <h3>Table of your preferences crypto</h3>
        <CryptoArray resource={resource} />
      </Box>
    </Box>
  );
}
