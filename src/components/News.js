import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from "prop-types";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

function News(props) {
  const [article, setArticle] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState(null);

  const updateNews = async () => {
    try {
      document.title = `NewsMonkey - ${capitalize(props.category)}`;
      // setLoading(true);
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=fd9d876538e0440986ae848fcfcbc24c&pageSize=${props.pageSize}&page=${page}`
      );
      if (!response.ok) {
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      }
      let actualData = await response.json();
      console.log(article);
      setArticle(article.concat(actualData.articles));
      setTotalResults(actualData.totalResults);
      setError(null);
    } catch (err) {
      setError(err.message);
      setArticle([]);
      setTotalResults(0);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    setArticle([]);
    updateNews();
    // eslint-disable-next-line
  }, []);

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const fetchMoreData = async () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setPage(page + 1);
    updateNews();
    // setTimeout(() => {
    //   this.setState({
    //     items: this.state.items.concat(Array.from({ length: 20 }))
    //   });
    // }, 1500);
  };

  // const handlePrevious = async () => {
  //   setPage(page - 1);
  // };

  // const handleNext = async () => {
  //   setPage(page + 1);
  // };

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
      {/* {!loading && (
          <div className="d-flex justify-content-between">
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
                  : page === Math.ceil(totalResults / props.pageSize)
              }
              onClick={handleNext}
            >
              Next &rarr;
            </button>
          </div>
        )} */}
    </>
  );
}

News.defaultProps = {
  country: "us",
  category: "general",
  pageSize: 18,
};

News.propTypes = {
  country: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  pageSize: PropTypes.number.isRequired,
};

export default News;
