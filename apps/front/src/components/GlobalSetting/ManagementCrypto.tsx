import React, { useEffect, useState } from "react";
import Select from "../Select";
import { Box, TextField } from "@mui/material";
import api from "../../services/api";

export default function ManagementCrypto(props: any) {
  const { userToken } = props;

  const [action, setAction] = useState("create");
  const [selectedCryptoID, setSelectedCryptoID] = useState({} as any);

  const [formData, setFormData] = useState({
    name: "",
    short_name: "",
    image: "regerge",
  });

  const options = [
    { id: "create", name: "Add new Crypto" },
    { id: "delete", name: "Delete Crypto" },
    { id: "restore", name: "Restore Crypto" },
  ];

  const [responseCrypto, setResponseCrypto] = React.useState([] as any);
  const [loadingCrypto, setLoadingCrypto] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      switch (action) {
        case "delete":
          console.log(selectedCryptoID);
          await api.deleteInternalCrypto(selectedCryptoID, userToken);
          break;
        case "restore":
          console.log(selectedCryptoID);
          await api.restoreInternalCrypto(selectedCryptoID, userToken);
          break;
        default:
          await api.postCrypto({ crypto: { ...formData } }, userToken);
          console.log("Crypto ajoutée avec succès!");
          break;
      }
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  useEffect(() => {
    const trashed = action !== "delete";
    const fetchData = async () => {
      try {
        setLoadingCrypto(true);
        const data = await api.getInternalCrypto(trashed, userToken);
        setResponseCrypto(data);
      } catch (error) {
        console.error("Error fetching cryptos:", error);
      } finally {
        setLoadingCrypto(false);
      }
    };

    fetchData();
  }, [action]);

  console.log("responseCrypto", responseCrypto);
  return (
    <form onSubmit={handleSubmit}>
      <Select
        name="Select"
        label="Select an action"
        required
        options={options}
        handleChange={(e: any) => setAction(e.target.value)}
      />

      <Box className="nameContainer">
        {action !== "create" ? (
          <Select
            name="Select"
            label={loadingCrypto ? "loading..." : "Select a crypto"}
            options={responseCrypto?.data}
            required={action !== "create"}
            handleChange={(e: any) => setSelectedCryptoID(e.target.value)}
          />
        ) : (
          <>
            <TextField
              className="inputField"
              name="name"
              type="text"
              required={action === "create"}
              placeholder="ex: bitcoin"
              label="New crypto name"
              value={formData.name}
              onChange={handleChange}
            />

            <TextField
              className="inputField"
              name="short_name"
              type="text"
              required={action === "create"}
              placeholder="ex: btc"
              label="New crypto short name"
              value={formData.short_name}
              onChange={handleChange}
            />
          </>
        )}
      </Box>

      <button type="submit">Soumettre</button>
    </form>
  );
}
