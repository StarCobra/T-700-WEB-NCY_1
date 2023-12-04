import React from "react"
import profilPic from "../../assets/sideBar/profil.png"
export default function UserLabel() {
  return (
    <div className="userLocation">
      <div className="userProfilePicture">
        <img src={profilPic} />
      </div>

      <div className="usernameContainer">
        <div className="userName">Arnaud B</div>

        <div className="userMail">arnaud.bourgoin@gmail.com</div>
      </div>
    </div>
  )
}
