import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

function News() {
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    const updateNews = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=fd9d876538e0440986ae848fcfcbc24c&pageSize=18&page=${page}`
        );
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        let actualData = await response.json();
        setArticle(actualData.articles);
        setTotalResults(actualData.totalResults);
      } catch (err) {
        setError(err.message);
        setArticle([]);
        setTotalResults(0);
      } finally {
        setLoading(false);
      }
    };
    updateNews();
  }, [page]);

  const handlePrevious = () => {
    setPage(page - 1);
  };

  const handleNext = () => {
    setPage(page + 1);
  };

  return (
    <>
      <h2 className="my-3 text-center">NewsMonkey - Top Headlines</h2>
      {loading && <Spinner />}
      <div className="d-flex align-content-around flex-wrap">
        {!loading && error.length !== 0 ? (
          <h2 style={{ margin: "10rem auto" }}>{error}</h2>
        ) : (
          !loading && article.map((element) => {
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
          })
        )}
      </div>
      {!loading && (
        <div
          className="d-flex justify-content-between"
          style={{ margin: "2rem 4rem" }}
        >
          <button
            type="button"
            className="btn btn-dark"
            disabled={page === 1}
            onClick={handlePrevious}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-dark px-4"
            disabled={
              totalResults === 0
                ? true
                : page + 1 === Math.ceil(totalResults / 18)
            }
            onClick={handleNext}
          >
            Next &rarr;
          </button>
        </div>
      )}
    </>
  );
}

export default News;
