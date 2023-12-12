import React from "react";
import "../../style/cryptoDisplay.scss";
import { TableRow, TableCell } from "@mui/material";

export default function ArrayRow(props: any) {
  const { crypto } = props;

  return (
    <TableRow>
      <TableCell>{crypto?.id}</TableCell>
      <TableCell>{crypto?.current_price}</TableCell>
      <TableCell className="negativePercentage">
        {crypto?.percent_price_day}
      </TableCell>
      <TableCell>{crypto?.highest_price_day}</TableCell>
      <TableCell>{crypto?.lowest_price_day}</TableCell>
    </TableRow>
  );
}
