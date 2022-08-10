import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from "prop-types";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

function News(props) {
  const [article, setArticle] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const updateNews = async () => {
      try {
        document.title = `NewsMonkey - ${capitalize(props.category)}`;
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=fd9d876538e0440986ae848fcfcbc24c&pageSize=18&page=${page}`,
          { signal: abortController.signal }
        );
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        let actualData = await response.json();
        setArticle(article.concat(actualData.articles));
        setTotalResults(actualData.totalResults);
        setError(null);
      } catch (err) {
        if (!abortController.signal.aborted) {
          setError(err.message);
          setArticle([]);
          setTotalResults(0);
          setPage(1);
        }
      }
    };
    updateNews();
    return () => {
      abortController.abort();
    };
    //eslint-disable-next-line 
  }, [page]);

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const fetchMoreData = () => {
    setPage(page + 1);
  };

  return (
    <>
      <h2 className="text-center my-3">
        NewsMonkey - Top {capitalize(props.category)} Headlines
      </h2>
      <InfiniteScroll
        dataLength={article.length}
        next={fetchMoreData}
        hasMore={article.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {error ? (
              <h2 className="text-center my-5">{error}</h2>
            ) : (
              article.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title : ""}
                      description={
                        element.description ? element.description : ""
                      }
                      imageUrl={
                        element.urlToImage
                          ? element.urlToImage
                          : "https://image.cnbcfm.com/api/v1/image/107000211-1642009706804-gettyimages-1011792700-mon1158118.jpeg?v=1642009864&w=1920&h=1080"
                      }
                      newsUrl={element.url}
                      author={element.author ? element.author : "Unknown"}
                      date={new Date(element.publishedAt).toGMTString()}
                      source={element.source.name}
                    />
                  </div>
                );
              })
            )}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
}

News.defaultProps = {
  category: "general",
};

News.propTypes = {
  category: PropTypes.string.isRequired,
};

export default News;
