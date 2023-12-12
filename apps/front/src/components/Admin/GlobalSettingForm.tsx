import * as React from 'react';
import '../../style/admin.scss';
import {Box, MenuItem, TextField} from "@mui/material";
import {useState} from "react";
import NewRssModal from './GlobalSettingFormModals/NewRssModal';
import NewCryptoModal from './GlobalSettingFormModals/NewCryptoModal';

export default function GlobalSettingForm() {
    const [crypto, setCrypto] = useState("")
    const [article, setArticle] = useState("")
    const [rssFlux, setRSSFlux] = useState("")
    const [removeCrypto, setRemoveCrypto] = useState("")

    const handleChangeSelectedCrypto = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCrypto(event.target.value)
    }
    const handleChangeSelectedArticle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setArticle(event.target.value)
    }
    const handleChangeSelectedRSSFlux = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRSSFlux(event.target.value)
    }
    const handleChangeSelectedRemoveCrypto = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRemoveCrypto(event.target.value)
    }

    return (
    <form className="formContainer">
        <Box className="chooseCrypto">
            <label>Choose different crypto :</label>
            <TextField
                label="Select a crypto"
                select
                className='SelectCryptoLabel'
                value={crypto}
                onChange={handleChangeSelectedCrypto}
                fullWidth
                color='warning'
                sx={{mt:0.5}}
            >
                <MenuItem value="0">BTC</MenuItem>
                <MenuItem value="1">ETH</MenuItem>
                <MenuItem value="2">BNB</MenuItem>
                <MenuItem value="3">USDC</MenuItem>
                <MenuItem value="4">SOL</MenuItem>
                <MenuItem value="5">ADA</MenuItem>
            </TextField>
        </Box>
        <Box className="chooseKeyword">
            <label>Choose default article keyword :</label>
            <TextField
                label="Select an article"
                select
                className='SelectCryptoLabel'
                value={article}
                onChange={handleChangeSelectedArticle}
                fullWidth
                color='warning'
                sx={{mt:0.5}}
            >
                <MenuItem value="0">BTC</MenuItem>
                <MenuItem value="1">ETH</MenuItem>
                <MenuItem value="2">BNB</MenuItem>
                <MenuItem value="3">USDC</MenuItem>
                <MenuItem value="4">SOL</MenuItem>
                <MenuItem value="5">ADA</MenuItem>
            </TextField>
        </Box>
        <Box className="chooseRss">
            <label>Add RSS flux :</label>
            <NewRssModal />
        </Box>
        <Box className="removeRss">
            <label>Remove RSS flux :</label>
            <TextField
                label="Select an RSS flux"
                select
                className='SelectCryptoLabel'
                value={rssFlux}
                onChange={handleChangeSelectedRSSFlux}
                fullWidth
                color='warning'
                sx={{mt:0.5}}
            >
            </TextField>
        </Box>
        <Box className="addCrypto">
            <label>Add new crypto :</label>
            <NewCryptoModal />
        </Box>
        <Box className="removeCrypto">
            <label>Remove a crypto</label>
            <TextField
                label="Select a crypto"
                select
                className='SelectCryptoLabel'
                value={removeCrypto}
                onChange={handleChangeSelectedRemoveCrypto}
                fullWidth
                color='warning'
                sx={{mt:0.5}}
            >
            </TextField>
        </Box>
    </form>
    );
}
