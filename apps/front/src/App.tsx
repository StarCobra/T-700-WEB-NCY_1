import React from 'react';
import SideBar from './components/SideBar/SideBar';
import MultipleArticlesDisplay from './components/Articles/MultipleArticlesDisplay';
import KeywordFilter from './components/Articles/KeywordFilter';
function App() {
  return (
    <div className="layoutContainer">
      <SideBar />
      <div className="displayContainer">
        <div className="dataContainer">
          <KeywordFilter />
          <MultipleArticlesDisplay />
        </div>
        {/* <div className="dataContainer">
          <CryptoArrayDisplay />
        </div> */}
      </div>
    </div>

  );
}

export default App;
