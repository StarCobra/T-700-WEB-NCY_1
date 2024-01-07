import React, { useEffect, useState } from "react";
import Select from "../Select";
import { Box, TextField } from "@mui/material";
import api from "../../services/api";

export default function ManagementKeyword(props: any) {
  const { userToken } = props;

  const [action, setAction] = useState("create");
  const [selectedKeywordID, setSelectedKeywordID] = useState({} as any);

  const [formData, setFormData] = useState({
    name: "",
  });

  const options = [
    { id: "create", name: "Add new Keyword" },
    { id: "delete", name: "Delete Keyword" },
    { id: "restore", name: "Restore Keyword" },
  ];

  const [responseKeyword, setResponseKeyword] = React.useState([] as any);
  const [loadingKeyword, setLoadingKeyword] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      switch (action) {
        case "delete":
          await api.deleteKeyword(selectedKeywordID, userToken);
          break;
        case "restore":
          await api.restoreKeyword(selectedKeywordID, userToken);
          break;
        default:
          await api.postKeyword({ keyword: { ...formData } }, userToken);
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
        setLoadingKeyword(true);
        const data = await api.getKeywords(trashed, userToken);
        setResponseKeyword(data);
      } catch (error) {
        console.error("Error fetching keywords:", error);
      } finally {
        setLoadingKeyword(false);
      }
    };

    fetchData();
  }, [action]);

  console.log("responsekeyword", responseKeyword);
  return (
    <Box>
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
              label={loadingKeyword ? "loading..." : "Select a keyword"}
              options={responseKeyword?.data}
              required={action !== "create"}
              handleChange={(e: any) => setSelectedKeywordID(e.target.value)}
            />
          ) : (
            <TextField
              className="inputField"
              name="name"
              type="text"
              required={action === "create"}
              placeholder="ex: blockchain"
              label="New keyword name"
              value={formData.name}
              onChange={handleChange}
            />
          )}
        </Box>

        <button type="submit">Soumettre</button>
      </form>
    </Box>
  );
}
