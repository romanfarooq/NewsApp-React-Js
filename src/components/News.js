import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

function News(props) {
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    const updateNews = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=fd9d876538e0440986ae848fcfcbc24c&pageSize=${props.pageSize}&page=${page}`
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
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    updateNews();
    // eslint-disable-next-line
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
        {!loading && article.map((element) => {
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
          disabled={page === 1}
          onClick={handlePrevious}
        >
          &larr; Previous
        </button>
        <button
          type="button"
          className="btn btn-dark px-4"
          disabled={page === Math.ceil(totalResults / props.pageSize)}
          onClick={handleNext}
        >
          Next &rarr;
        </button>
      </div>
    </>
  );
}

export default News;
