import * as React from 'react';
import '../../../style/article.scss'
import articleExample  from "../../../assets/articles/articleExample.jpg"

export default function ArticleThumbnail() {
  return (
    <div className="articleThumbnail">
        <img src={ articleExample }></img>
    </div>
  )
}
 