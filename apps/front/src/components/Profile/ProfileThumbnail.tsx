import React from "react"
import exampleImage from "../../assets/profile/profileExample.png"

export default function ProfileThumbnail() {
  return (
    <div className="profileThumbnailContainer">
      <img src={exampleImage} />
    </div>
  )
}