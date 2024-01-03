import React, { useState } from "react";
import "../../style/article.scss";
import { Box } from "@mui/material";
import Select from "../Select";

export default function SearchBar() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [keywords, setKeywords] = useState([]);

  // TODO : remplacer par valeur de l'API
  const options = [
    { value: "Income", label: "Income" },
    { value: "BTC", label: "BTC" },
    { value: "Bankrupt", label: "Bankrupt" },
    { value: "ETH", label: "ETH" },
  ];

  return (
    <form className="searchBarContainer">
      <Box className="selectSearchContainer">
        <Box className="selectSearch">
          <Select
            name="Select"
            label="Choose a keyword"
            options={options}
            handleChange={(e: any) => setKeywords(e.target.value)}
          />
        </Box>
      </Box>
    </form>
  );
}
