import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";

function News() {
  const [article, setArticle] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const updateNews = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=fd9d876538e0440986ae848fcfcbc24c&pageSize=18&page=${page}`;
    const data = await fetch(url);
    const parsedData = await data.json();
    setArticle(parsedData.articles);
    setTotalResults(parsedData.totalResults);
  };

  useEffect(() => {
    updateNews();
  });

  const handlePrevious = async () => {
      setPage(page - 1);
      updateNews();
  };

  const handleNext = async () => {
    setPage(page + 1);
    updateNews();
  };

  return (
    <>
      <h2 className="my-3" style={{ textAlign: "center" }}>
        NewsMonkey - Top Headlines
      </h2>
      <div className="d-flex align-content-around flex-wrap">
        {article.map((element) => {
          return (
            <NewsItem
              key={element.url}
              title={element.title ? element.title : ""}
              description={element.description ? element.description : ""}
              imageUrl={
                element.urlToImage
                  ? element.urlToImage
                  : "https://image.cnbcfm.com/api/v1/image/107000211-1642009706804-gettyimages-1011792700-mon1158118.jpeg?v=1642009864&w=1920&h=1080"
              }
              newsUrl={element.url}
            />
          );
        })}
      </div>
      <div
        className="d-flex justify-content-between"
        style={{ margin: "2rem 4rem" }}
      >
        <button
          type="button"
          className="btn btn-dark"
          disabled={page <= 1}
          onClick={handlePrevious}
        >
          &larr; Previous
        </button>
        <button
          type="button"
          className="btn btn-dark px-4"
          disabled={page >= Math.ceil(totalResults / 18)}
          onClick={handleNext}
        >
          Next &rarr;
        </button>
      </div>
    </>
  );
}

export default News;
