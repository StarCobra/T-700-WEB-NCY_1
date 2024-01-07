import * as React from "react";
import "../../style/admin.scss";
import { Box } from "@mui/material";
import { useState } from "react";
import NewRssModal from "./FormModals/NewRssModal";
import NewCryptoModal from "./FormModals/NewCryptoModal";
import Select from "../Select";

export default function Form() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [crypto, setCrypto] = useState([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [article, setArticle] = useState([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [rssFlux, setRSSFlux] = useState([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [removeCrypto, setRemoveCrypto] = useState([]);

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

  return (
    <form className="formContainer">
      <Select
        name="Select"
        label="Default crypto"
        options={options}
        handleChange={(e: any) => setCrypto(e.target.value)}
      />

      <Select
        name="Select"
        label="Default article keyword"
        options={options}
        handleChange={(e: any) => setArticle(e.target.value)}
      />

      <Box className="modalContainer">
        <label>Add RSS flux :</label>
        <NewRssModal />
      </Box>

      <Select
        name="Select"
        label="Default RSS flux"
        options={options}
        handleChange={(e: any) => setRSSFlux(e.target.value)}
      />

      <Box className="modalContainer">
        <label>Add new crypto</label>
        <NewCryptoModal />
      </Box>

      <Select
        name="Select"
        label="Remove crypto"
        options={options}
        handleChange={(e: any) => setRemoveCrypto(e.target.value)}
      />
    </form>
  );
}
