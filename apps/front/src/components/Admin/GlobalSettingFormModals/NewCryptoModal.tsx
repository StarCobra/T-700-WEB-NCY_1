import * as React from 'react';
import '../../../style/admin.scss';
import { Box, Button, Modal, TextField, Typography, styled } from '@mui/material';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function NewCryptoModal() {
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
      });

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
            <Button onClick={handleOpen}>Add a new Crypto</Button>
            <Modal open={open}
                onClose={handleClose}>
                <Box className="addRssModal" sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <Box className="titleContainer">
                            <Box className="Title">
                                Add new Cryptocurrency
                            </Box>
                            <Box className="iconRss">
                                <CurrencyBitcoinIcon />
                            </Box>
                        </Box>
                    </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <form className='rssAddContainer'>
                        <Box className="rssName">
                            <label>Name : </label>
                            <TextField id="outlined-basic" label="Add a crypto name" variant="outlined" />
                        </Box>
                        <Box className="rssUrl">
                            <label className='labelUrl'>Picture : </label>
                            <Button className="picUpload" component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                Upload picture
                                <VisuallyHiddenInput type="file" />
                            </Button>
                        </Box>
                        <Box className="rssSubmit">
                            <Button>Submit</Button>
                        </Box>
                    </form>
                </Typography>
                </Box>
            </Modal>
        </span>
    )
}
