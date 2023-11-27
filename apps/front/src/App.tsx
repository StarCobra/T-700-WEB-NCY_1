import React from 'react';
import SideBar from './components/SideBar/SideBar';
import MultipleArticlesDisplay from './components/Articles/ArticleThumbnails/MultipleArticlesDisplay';
import KeywordFilter from './components/Articles/ArticleThumbnails/KeywordFilter';
import FullArticleDisplay from './components/Articles/FullArticle/FullArticleDisplay';
function App() {
  return (
    <div className="layoutContainer">
      <SideBar />
      <div className="displayContainer">
        <div className="dataContainer">
          <FullArticleDisplay />
        </div>
        {/* <div className="dataContainer">
          <CryptoArrayDisplay />
        </div> */}
      </div>
    </div>

  );
}

export default App;
