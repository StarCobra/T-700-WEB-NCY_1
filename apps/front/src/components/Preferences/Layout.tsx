import React from "react";
import { Box } from "@mui/material";
import CryptoArray from "../Crypto/Array";
import Select from "../Select";
import "../../style/preferencies.scss";
import "../../style/cryptoDisplay.scss";

export default function Layout() {
  const [favoriteCrypto, setFavoriteCrypto] = React.useState([]);

  // TODO : remplacer par valeur de l'API
  const options = [
    { value: "BTC", label: "BTC" },
    { value: "ETH", label: "ETH" },
    { value: "SOL", label: "SOL" },
    { value: "ADA", label: "ADA" },
    { value: "DOT", label: "DOT" },
    { value: "LUNA", label: "LUNA" },
    { value: "LINK", label: "LINK" },
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

  return (
    <Box className="preferencesLayout">
      <Box className="headerContainer">
        <h3>Preferences page</h3>
        <small>
          This page is used to manage your preferences. You can choose your
          favorite crypto.
        </small>
        <small>
          The chosen crypto will be displayed on the home page and you&apos;ll
          receive in priority the new articles about it.
        </small>
      </Box>
      <Box className="arrayContainer">
        <h3>Table of cryptos available</h3>
        <CryptoArray resource={resource} />
      </Box>
      <Box className="addPrefContainer">
        <Box className="selectContainer">
          <h3>Add crypto to your favorite cypto</h3>
          <Select
            name="Select"
            label="Favorite crypto(s) chosen:"
            type="multiple"
            options={options}
            handleChange={(e: any) => setFavoriteCrypto(e.target.value)}
          />
        </Box>
        <Box className="cryptoDisplayContainer">
          <h3>
            You have chosen {favoriteCrypto.length} crypto(s) as favorite crypto :
          </h3>
          {favoriteCrypto.length > 0 && (
            <ul>
              {favoriteCrypto.map((crypto: any) => (
                <li key={crypto}>{crypto}</li>
              ))}
            </ul>
          )}
        </Box>
      </Box>
    </Box>
  );
}
