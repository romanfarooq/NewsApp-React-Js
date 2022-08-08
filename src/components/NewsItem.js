import React from "react";

function NewsItem(props) {
  const { title, description, imageUrl, newsUrl, author, date, source } = props;

  return (
    <div className="card my-3">
      <img src={imageUrl} className="card-img-top" alt={title} />
      <span
        class="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
        style={{ zIndex: 1, left: "90%" }}
      >
        {source}
      </span>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <p class="card-text">
          <small class="text-muted">
            By {author} on {date}
          </small>
        </p>
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
  );
}

export default NewsItem;
