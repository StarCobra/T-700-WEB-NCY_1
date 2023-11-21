import * as React from 'react';
import { useState } from 'react';
import '../../style/cryptoDisplay.scss';
import { Box, TextField, MenuItem } from '@mui/material';

export default function selectCrypto() {
  const [cryptos, setCryptos] = useState<string[]>([])
  console.log(cryptos)
  const handleChangeSelectedCryptos = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setCryptos(typeof value === 'string' ? value.split(',') : value)
  }
  return (
    <div className="selectCryptoContainer">
        <span>Choose your crypto(s) :</span>
        <span>
          <Box className="SelectCryptoBox" color="warning">
            <TextField 
              label="Select a crypto" 
              select 
              className='SelectCryptoLabel' 
              value={cryptos} 
              onChange={handleChangeSelectedCryptos} 
              fullWidth
              SelectProps={{ multiple:true }}
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
        </span>
    </div>
  )
}


const cryptosExample=[{id:0, name:"BTC"}, {id:1, name:"ETH"}, {id:2, name:"BNB"}, {id:3, name:"USDC"}, {id:4, name:"SOL"}, {id:5, name:"ADA"}]