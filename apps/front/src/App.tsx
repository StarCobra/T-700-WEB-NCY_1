import React from 'react';
import SideBar from './components/SideBar/SideBar';
import Profile from './components/Profile/Profile';
function App() {
  return (
    <div className="layoutContainer">
      <SideBar />
      <div className="displayContainer">
        <div className="dataContainer">
          <Profile />
        </div>
      </div>
    </div>

  );
}

export default App;
