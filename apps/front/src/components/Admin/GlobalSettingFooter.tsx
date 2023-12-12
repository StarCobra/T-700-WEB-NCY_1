import * as React from 'react';
import '../../style/admin.scss';
import {Box} from "@mui/material";

export default function GlobalSettingFooter() {
    return (
        <Box className="commentContainer">
            <Box>
                <h3>
                    Please <a href="mailto:developpers@cryptofanatix.com?subject=Add new crypto&body=Hello, I want to add a new crypto called : ">contact a developper</a> if you want to add a new crypto.
                </h3>
            </Box>
        </Box>
    )
}
