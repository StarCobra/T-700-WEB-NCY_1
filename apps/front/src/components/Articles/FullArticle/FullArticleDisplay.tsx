import * as React from 'react';
import '../../../style/article.scss'
import ArticleHeader from './ArticleHeader';
import FullArticleContent from './FullArticleContent';

export default function FullArticleDisplay() {
  return (
    <div className="fullArticleDisplay">
      <ArticleHeader />
      <FullArticleContent />
    </div>
  )
}
 