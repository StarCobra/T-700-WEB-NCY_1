import * as React from 'react';
import '../../style/admin.scss';
import SettingsIcon from '@mui/icons-material/Settings';
import {Box} from "@mui/material";

export default function GlobalSettingHeader() {
    return (
        <Box className="titleContainer">
            <Box className="title">
                <h1>Global Settings</h1>
            </Box>
            <Box className="icon">
                <SettingsIcon />
            </Box>
        </Box>
    )
}
