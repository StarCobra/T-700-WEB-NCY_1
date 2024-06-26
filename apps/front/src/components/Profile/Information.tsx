import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import api from "../../services/api";
import dayjs from "dayjs";

export default function Information(props: any) {
  const { user, userToken } = props;

  const [formData, setFormData] = useState({
    first_name: user?.first_name ?? "",
    last_name: user?.last_name ?? "",
    birth_date: dayjs(user?.birth_date).format("YYYY-MM-DD") ?? "",
    email: user?.email ?? "",
  });

  const [edit, setEdit] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.putProfile({ ...formData }, userToken);
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
    }
  };

  return (
    <Box >
      <form className="profileInfoContainer" onSubmit={handleSubmit}>
        <Box className="labelInfo">
           <h3 className="labelH3">First name:</h3>
                {edit ? (
                  <TextField
                    className="valueH3"
                    name="first_name"
                    type="text"
                    required
                    placeholder="ex: John"
                    label="First Name"
                    value={formData.first_name}
                    onChange={handleChange}
                  />
                ) : (
                  <h3 className="valueH3">{user?.first_name}</h3>
                )}
              </Box>

              <Box
                className="labelInfo"
                display="flex"
                flexDirection="row"
                gap="10px"
                alignItems="center"
              >
                <h3 className="labelH3">Last name</h3>

                {edit ? (
                  <TextField
                    className="valueH3"
                    name="first_name"
                    type="text"
                    required
                    placeholder="ex : Doe"
                    label="Last Name"
                    value={formData.last_name}
                    onChange={handleChange}
                  />
                ) : (
                  <h3 className="valueH3">{user?.last_name}</h3>
                )}
              </Box>

              <Box
                className="labelInfo"
                display="flex"
                flexDirection="row"
                gap="10px"
                alignItems="center"
              >
                <h3 className="labelH3">E-mail :</h3>

                {edit ? (
                  <TextField
                    className="valueH3"
                    name="email"
                    type="email"
                    required
                    placeholder="ex: john@gmail.com"
                    label="E-mail"
                    value={formData.email}
                    onChange={handleChange}
                  />
                ) : (
                  <h3 className="valueH3">{user?.email}</h3>
                )}
              </Box>

              <Box
                id="birhtBox"
                className="labelInfo"
                display="flex"
                flexDirection="row"
                gap="10px"
                alignItems="center"
              >
                <h3 className="labelH3">Birth date :</h3>

                {edit ? (
                  <TextField
                    className="valueH3"
                    name="date"
                    type="date"
                    required
                    placeholder="ex: john@gmail.com"
                    label="E-mail"
                    variant="outlined"
                    value={formData.birth_date}
                    onChange={handleChange}
                  />
                ) : (
                  <h3 className="valueH3">{dayjs(user?.birth_date).format("dddd DD MMMM YYYY")}</h3>
                )}
              </Box>

              <Box
                className="buttonDiv"
                display="flex"
                flexDirection="column"
                gap="20px"
                marginTop="20px"
              >
                <Button
                  id="edit"
                  onClick={() => {
                    setEdit(!edit);
                  }}
                >
                  {edit ? "Canceled" : "Edit my profile"}
                </Button>
                {edit && <Button type="submit">Update</Button>}
              </Box>
      </form>
    </Box>
  );
}
