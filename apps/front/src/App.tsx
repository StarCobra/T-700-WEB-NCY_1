import React from 'react';
import SideBar from './components/SideBar/SideBar';
import FullArticleDisplay from './components/Articles/FullArticle/FullArticleDisplay';
function App() {
  return (
    <div className="layoutContainer">
      <SideBar />
      <div className="displayContainer">
        <div className="dataContainer">
          <FullArticleDisplay />
        </div>
      </div>
    </div>

  );
}

export default App;
