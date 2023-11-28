import * as React from 'react';
import '../../style/admin.scss';
import SettingsIcon from '@mui/icons-material/Settings';
import {Box} from "@mui/material";

export default function GlobalSettingHeader() {
    return (
        <div>
            <Box className="flex-center">
                <h3>Global Settings</h3>
                <SettingsIcon sx={{ fontSize: 40 }} />
            </Box>
        </div>
    )
}
