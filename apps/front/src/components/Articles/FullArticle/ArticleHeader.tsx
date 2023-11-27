import * as React from 'react';
import '../../../style/article.scss'
import FullArticleThumbnail from './FullArticleThumbnail';
import FullArticleTitle from './FullArticleTitle';

export default function ArticleHeader() {
  return (
      <div className="articleHeader">
        <FullArticleThumbnail />
        <FullArticleTitle />
      </div>
  )
}
 