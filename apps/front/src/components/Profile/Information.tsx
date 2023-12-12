import React from "react";
import { Box, Button, TextField } from "@mui/material";

export default function Information(props: any) {
  const { user } = props;

  const [edit, setEdit] = React.useState(false);

  return (
    <Box className="profileInfoContainer">
      <Box
        id="usernameBox"
        className="labelInfo"
        display="flex"
        flexDirection="row"
        gap="10px"
        alignItems="center"
      >
        <h3>Username :</h3>

        {edit ? (
          <TextField
            id="standard-basic"
            type="text"
            label="Username"
            variant="standard"
            defaultValue={user?.name}
          />
        ) : (
          <h3>{user?.name}</h3>
        )}
      </Box>

      <Box
        id="mailBox"
        className="labelInfo"
        display="flex"
        flexDirection="row"
        gap="10px"
        alignItems="center"
      >
        <h3>E-mail :</h3>

        {edit ? (
          <TextField
            id="standard-basic"
            type="email"
            label="E-mail"
            variant="standard"
            defaultValue={user?.mail}
          />
        ) : (
          <h3>{user?.mail}</h3>
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
        <h3>Birth date :</h3>

        {edit ? (
          <TextField
            id="standard-basic"
            type="date"
            variant="standard"
            defaultValue={user?.birth_date}
          />
        ) : (
          <h3>{user?.birth_date}</h3>
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
          Edit my profile
        </Button>

        <Button id="delete">Delete my profile</Button>
      </Box>
    </Box>
  );
}
