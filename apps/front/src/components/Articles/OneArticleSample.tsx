import * as React from 'react';
import '../../style/article.scss'
import ArticleThumbnail from './ArticleThumbnail';
import ArticleTitleSample from './ArticleTitleSample';
import ArticleSampleContent from './ArticleSampleContent';
import ArticleDate from './ArticleDate';

export default function OneArticleSample() {
  return (
    <div className="articleSample">
            <ArticleThumbnail />
            <div className="articleSampleContent">
                <ArticleTitleSample />
                <ArticleSampleContent />
                <ArticleDate />
            </div>
        </div>
  )
}
 