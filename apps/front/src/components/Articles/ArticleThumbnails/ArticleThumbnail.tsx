import * as React from 'react';
import '../../../style/article.scss'
import articleExample  from "../../../assets/articles/articleExample.jpg"

export default function articleThumbnail() {
  return (
    <div className="articleThumbnail">
        <img src={ articleExample }></img>
    </div>
  )
}
 