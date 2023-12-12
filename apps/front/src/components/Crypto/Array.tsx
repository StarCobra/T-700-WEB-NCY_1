import React from "react";
import "../../style/cryptoDisplay.scss";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Box,
} from "@mui/material";
import ArrayRow from "./ArrayRow";

export default function Array(props: any) {
  const { resource = [] } = props;

  return (
    <Box className="cryptoTableContainer">
      {resource.length === 0 ? (
        <h1>No data</h1>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Crypto name</TableCell>
                <TableCell>Last price</TableCell>
                <TableCell>24h change</TableCell>
                <TableCell>24h max</TableCell>
                <TableCell>24h min</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {resource.map((crypto: any) => (
                <ArrayRow key={crypto.id} crypto={crypto} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
