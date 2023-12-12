import React from "react";
import "../style/error.scss";
import { Box, Modal, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import WarningOutlinedIcon from "@mui/icons-material/WarningOutlined";
import { Link } from "react-router-dom";

export default function ErrorModal(props: any) {
  const { title = "", content = "", type = "" } = props;

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Box>
      <Modal open={true}>
        <Box className="errorModal" sx={style}>
          {title !== "" && (
            <Box className="flexTitle">
              <Box className="titleContainer">
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  <h3>{title}</h3>
                </Typography>
              </Box>
              <Box className="iconContainer">
                {type === "error" && <ErrorOutlineIcon />}
                {type === "warning" && <WarningOutlinedIcon />}
              </Box>
            </Box>
          )}
          {content !== "" && (
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <p>{content}</p>
            </Typography>
          )}
          <Box>
            <Link to={"/"}>Retour à l&apos;accueil</Link>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
