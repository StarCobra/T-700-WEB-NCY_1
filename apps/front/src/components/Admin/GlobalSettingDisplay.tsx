import * as React from 'react';
import '../../style/admin.scss';
import GlobalSettingHeader from './GlobalSettingHeader';
import GlobalSettingForm from './GlobalSettingForm';
import GlobalSettingFooter from './GlobalSettingFooter';

export default function GlobalSettingDisplay() {
    return (
        <div className="ArrayDisplay">
            <GlobalSettingHeader />
            <GlobalSettingForm />
            <GlobalSettingFooter />
        </div>
    )
}
