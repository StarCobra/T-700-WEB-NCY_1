import React from "react";
import "../../../style/article.scss";
import { Box, MenuItem, TextField } from "@mui/material";

export default function KeywordFilter() {
  const [keywords, setKeywords] = React.useState<string[]>([]);

  const handleChangeSelectedKeywords = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;
    setKeywords(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div className="keywordFilterContainer">
      <div className="selectFilter">
        <Box className="SelectKeywordsBox" color="warning">
          <TextField
            name="SelectKeywords"
            label="Select a keyword"
            select
            className="SelectKeywordsLabel"
            value={keywords}
            onChange={handleChangeSelectedKeywords}
            fullWidth
            SelectProps={{ multiple: true }}
            color="warning"
          >
            <MenuItem value="BTC">BTC</MenuItem>
            <MenuItem value="Bankerupt">Bankerupt</MenuItem>
            <MenuItem value="Crisis">Crisis</MenuItem>
          </TextField>
        </Box>
      </div>
    </div>
  );
}
