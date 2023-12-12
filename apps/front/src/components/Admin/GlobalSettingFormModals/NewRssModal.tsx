import * as React from 'react';
import '../../../style/admin.scss';
import {Box, Button, Modal, TextField, Typography} from "@mui/material";
import RssFeedIcon from '@mui/icons-material/RssFeed';

export default function NewRssModal() {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };  
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  return (
    <span>
    <Button onClick={handleOpen}>Add new RSS flux</Button>
      <Modal open={open}
        onClose={handleClose}>
        <Box className="addRssModal" sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <Box className="titleContainer">
                    <Box className="Title">
                        Add RSS feed
                    </Box>
                    <Box className="iconRss">
                        <RssFeedIcon />
                    </Box>
                </Box>
              </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form className='rssAddContainer'>
                <Box className="rssName">
                    <label>Name : </label>
                    <TextField id="outlined-basic" label="Add a RSS name" variant="outlined" />
                </Box>
                <Box className="rssUrl">
                    <label className='labelUrl'>URL : </label>
                    <TextField id="outlined-basic" label="Add the RSS Url" variant="outlined" />
                </Box>
                <Box className="rssSubmit">
                    <Button>Submit</Button>
                </Box>
            </form>
          </Typography>
        </Box>
      </Modal>
    </span>
  );
}
