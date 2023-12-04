import React from "react"
import ProfileThumbnail from "./ProfileThumbnail"
import "../../style/profile.scss"
import ProfileInformation from "./ProfileInformation"

export default function Profile() {
  return (
    <div className="centeringDiv">
      <div className="profileLayout">
        <ProfileThumbnail />
        <ProfileInformation />
      </div>
    </div>
  )
}