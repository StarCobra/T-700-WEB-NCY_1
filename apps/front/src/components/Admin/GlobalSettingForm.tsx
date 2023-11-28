import * as React from 'react';
import '../../style/admin.scss';
import {Box, Button, MenuItem, TextField} from "@mui/material";
import {useState} from "react";

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
        <div>
            <Box className="Array">
                <form>
                    <Box>
                        <label>Choose different crypto :</label>
                        <TextField
                            label="Select a crypto"
                            select
                            className='SelectCryptoLabel'
                            value={crypto}
                            onChange={handleChangeSelectedCrypto}
                            fullWidth
                            color='warning'
                        >
                            <MenuItem value="0">BTC</MenuItem>
                            <MenuItem value="1">ETH</MenuItem>
                            <MenuItem value="2">BNB</MenuItem>
                            <MenuItem value="3">USDC</MenuItem>
                            <MenuItem value="4">SOL</MenuItem>
                            <MenuItem value="5">ADA</MenuItem>
                        </TextField>
                    </Box>
                    <Box>
                        <label>Choose default article keyword :</label>
                        <TextField
                            label="Select an article"
                            select
                            className='SelectCryptoLabel'
                            value={article}
                            onChange={handleChangeSelectedArticle}
                            fullWidth
                            color='warning'
                        >
                            <MenuItem value="0">BTC</MenuItem>
                            <MenuItem value="1">ETH</MenuItem>
                            <MenuItem value="2">BNB</MenuItem>
                            <MenuItem value="3">USDC</MenuItem>
                            <MenuItem value="4">SOL</MenuItem>
                            <MenuItem value="5">ADA</MenuItem>
                        </TextField>
                    </Box>
                    <Box>
                        <label>Add RSS flux :</label>
                        <Button>Add new RSS flux</Button>
                    </Box>
                    <Box>
                        <label>Remove RSS flux :</label>
                        <TextField
                            label="Select an RSS flux"
                            select
                            className='SelectCryptoLabel'
                            value={rssFlux}
                            onChange={handleChangeSelectedRSSFlux}
                            fullWidth
                            color='warning'
                        >
                        </TextField>
                    </Box>
                    <Box>
                        <label>Add new crypto :</label>
                        <Button>Add new crypto</Button>
                    </Box>
                    <Box>
                        <label>Remove a crypto</label>
                        <TextField
                            label="Select a crypto"
                            select
                            className='SelectCryptoLabel'
                            value={removeCrypto}
                            onChange={handleChangeSelectedRemoveCrypto}
                            fullWidth
                            color='warning'
                        >
                        </TextField>
                    </Box>
                </form>
            </Box>
        </div>
    );
}
