import React from "react";
import NewsItem from "./NewsItem";

function News() {
  return (
    <div className="container my-3">
      <h2>NewsMonkey - Top Headlines</h2>
      <div className="d-flex justify-content-between flex-wrap">
        <NewsItem />
        <NewsItem />
        <NewsItem />
        <NewsItem />
        <NewsItem />
        <NewsItem />
      </div>
    </div>
  );
}

export default News;
