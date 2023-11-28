import * as React from 'react';
import LogoSideBar from './Logo';
import UserLabel from './UserLabel';
import Menus from './Menus';
import '../../style/default.scss'
import '../../style/sidebar.scss'


export default function SideBar() {
  return (
    <div className="sideBarContainer">
            <LogoSideBar />
            <UserLabel />
            <Menus />
        </div>
  )
}
 