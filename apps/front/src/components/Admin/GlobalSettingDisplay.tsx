import * as React from 'react';
import '../../style/admin.scss';
import GlobalSettingHeader from './GlobalSettingHeader';
import GlobalSettingForm from './GlobalSettingForm';
import GlobalSettingFooter from './GlobalSettingFooter';
import { Box } from '@mui/material';

export default function GlobalSettingDisplay() {
    return (
        <Box className="ArrayDisplay">
            <GlobalSettingHeader />
            <GlobalSettingForm />
            <GlobalSettingFooter />
        </Box>
    )
}
