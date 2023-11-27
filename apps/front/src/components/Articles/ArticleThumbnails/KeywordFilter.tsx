import * as React from 'react';
import '../../../style/article.scss'
import { Box, MenuItem, TextField } from '@mui/material';

export default function KeywordFilter() {
    const [keywords, setKeywords] = React.useState<string[]>([])
    console.log(keywords)
    const handleChangeSelectedKeywords = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setKeywords(typeof value === 'string' ? value.split(',') : value)
  }
  return (
    <div className="keywordFilterContainer">
        <div className="selectFilter">
            <Box className="SelectKeywordsBox" color="warning">
            <TextField 
              label="Select a keyword" 
              select 
              className='SelectKeywordsLabel' 
              value={keywords} 
              onChange={handleChangeSelectedKeywords} 
              fullWidth
              SelectProps={{ multiple:true }}
              color='warning'
            >
              <MenuItem value="0">BTC</MenuItem>
              <MenuItem value="1">Bankerupt</MenuItem>
              <MenuItem value="2">Crisis</MenuItem>
            </TextField>
          </Box>
        </div>
    </div>
  )
}
 