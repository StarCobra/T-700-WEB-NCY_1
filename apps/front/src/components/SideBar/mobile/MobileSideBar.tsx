import React from 'react';
import '../../../style/sidebar.scss'
import MobileLogo from './MobileLogo';
import MobileSandwichLogo from './MobileSandwichLogo';
import MobileSignOut from './MobileSignOut';
export default function MobileSideBar() {
  return (
    <div className="mobileSideBarLayout">
        <MobileLogo />
        <MobileSandwichLogo />
        <MobileSignOut />
    </div>

  );
}