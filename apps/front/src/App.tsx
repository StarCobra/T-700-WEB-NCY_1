import React from 'react';
import SideBar from './components/SideBar/SideBar';
import CryptoChart from './components/CryptoChart/CryptoChart';
import CryptoArrayDisplay from './components/CryptoArray/CryptoArrayDisplay';
function App() {
  return (
    <div className="layoutContainer">
      <SideBar />
      <div className="displayContainer">
        <div className="dataContainer">
          <CryptoChart />
        </div>
        <div className="dataContainer">
          <CryptoArrayDisplay />
        </div>
      </div>
    </div>

  );
}

export default App;
