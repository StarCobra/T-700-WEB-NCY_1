import React from "react"
import "../../../style/article.scss"
import OneArticleSample from "./OneArticleSample"

export default function MultipleArticlesDisplay() {
  return (
    <div className="articleMasterContainer">
      <div className="articleSampleContainer">
        <OneArticleSample />
      </div>

      <div className="articleSampleContainer">
        <OneArticleSample />
      </div>

      <div className="articleSampleContainer">
        <OneArticleSample />
      </div>

      <div className="articleSampleContainer">
        <OneArticleSample />
      </div>
    </div>
  )
}
