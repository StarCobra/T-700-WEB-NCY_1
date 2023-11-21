import * as React from 'react';
import '../../style/cryptoDisplay.scss';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';

export default function CryptoArray() {
  return (
    <div className='cryptoTableContainer'>
        <div className="cryptoArray">
            <TableContainer component={Paper}>
                <Table aria-aria-label='Crypto Array'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Crypto name</TableCell>
                            <TableCell>Last price</TableCell>
                            <TableCell>24h change</TableCell>
                            <TableCell>24h max</TableCell>
                            <TableCell>24h min</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>BTC</TableCell>
                            <TableCell>36 772</TableCell>
                            <TableCell className='negativePercentage'>-1,09</TableCell>
                            <TableCell>37 443</TableCell>
                            <TableCell>36 567</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>ETH</TableCell>
                            <TableCell>2 086</TableCell>
                            <TableCell className='positivePercentage'>1,27</TableCell>
                            <TableCell>2 105</TableCell>
                            <TableCell>2 028</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Test</TableCell>
                            <TableCell>36 772</TableCell>
                            <TableCell className='negativePercentage'>-1,09</TableCell>
                            <TableCell>37 443</TableCell>
                            <TableCell>36 567</TableCell>
                        </TableRow> 
                        <TableRow>
                            <TableCell>Test2</TableCell>
                            <TableCell>36 772</TableCell>
                            <TableCell className='negativePercentage'>-1,09</TableCell>
                            <TableCell>37 443</TableCell>
                            <TableCell>36 567</TableCell>
                        </TableRow> 
                        <TableRow>
                            <TableCell>Test3</TableCell>
                            <TableCell>36 772</TableCell>
                            <TableCell className='negativePercentage'>-1,09</TableCell>
                            <TableCell>37 443</TableCell>
                            <TableCell>36 567</TableCell>
                        </TableRow> 
                        <TableRow>
                            <TableCell>Test4</TableCell>
                            <TableCell>36 772</TableCell>
                            <TableCell className='negativePercentage'>-1,09</TableCell>
                            <TableCell>37 443</TableCell>
                            <TableCell>36 567</TableCell>
                        </TableRow> 
                        <TableRow>
                            <TableCell>Test5</TableCell>
                            <TableCell>36 772</TableCell>
                            <TableCell className='negativePercentage'>-1,09</TableCell>
                            <TableCell>37 443</TableCell>
                            <TableCell>36 567</TableCell>
                        </TableRow> 
                    </TableBody>
                </Table>
            </TableContainer>
        
        </div>
    </div>
  )
}
 