import React, { useState } from "react";
import "../../style/article.scss";
import { Box } from "@mui/material";
import Select from "../Select";

export default function SearchBar() {
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const [keywords, setKeyword] = useState([]);

 // TODO : remplacer par valeur de l'API
 const options = [
    { value: 1, label: "Income" },
    { value: 2, label: "BTC" },
    { value: 3, label: "Bankerupt" },
    { value: 4, label: "ETH" },
  ];

  return (
    <form className="searchBarContainer">
        <Box className="selectSearchContainer">
            <Box className="selectSearch">
            <Select
                name="Select"
                label="Choose a keyword"
                options={options}
                handleChange={(e: any) => setKeyword(e.target.value)}
            />
            </Box>
        </Box>
    </form>
  );
}
