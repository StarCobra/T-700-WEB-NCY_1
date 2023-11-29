import { TextField } from '@mui/material';
import * as React from 'react';

export default function ProfileInformation() {
  return (
    <div className="centeringDiv">
        <div className="profileInfoContainer">
            <div id="usernameLabel" className="labelInfo">
                Username :
            </div>
            <div id="username" className="userInfo">
                <p>Arnaud Bourgoin</p>
                <TextField id="standard-basic" label="Username" className='hidden' variant="standard" />
            </div>
            <div id="mailLabel" className="labelInfo">
                Email Address :
            </div>
            <div id="mail" className="userInfo">
                <p>Arnaudbrg@gmail.com</p>
                <TextField id="standard-basic" label="Mail" className='hidden' variant="standard" />
            </div>
            <div id="birthLabel" className="labelInfo">
                Birth Date :
            </div>
            <div id="birth" className="userInfo">
                <p>2000-03-10</p>
                <TextField id="standard-basic" label="A CHANGER" className='hidden' variant="standard" />
            </div>
            <div id="edit" className="buttonDiv">
                <button>Edit my profile</button>
            </div>
            <div id="delete" className="buttonDiv">
                <button>Delete my profile</button>
            </div>
        </div>
    </div>
  )
}