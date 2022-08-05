import React from "react";

function NewsItem(props) {
  const { title, description, imageUrl, newsUrl } = props;

  return (
    <div style={{ margin: "0 4rem" }}>
      <div className="card my-3" style={{ width: "18rem" }}>
        <img src={imageUrl} className="card-img-top" alt={title} />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <a
            href={newsUrl}
            rel="noreferrer"
            target="_blank"
            className="btn btn-sm btn-dark"
          >
            Read More...
          </a>
        </div>
      </div>
    </div>
  );
}

export default NewsItem;
