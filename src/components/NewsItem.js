import React from "react";

function NewsItem(props) {
  
  const { title, description, imageUrl, key } = props;

  return (
    <div style={{ margin: "0 4rem" }}>
      <div className="card my-3" style={{ width: "18rem" }}>
        <img src={imageUrl} className="card-img-top" alt={title} />
        <div className="card-body">
          <h5 className="card-title">{title.slice(0, 74)}</h5>
          <p className="card-text">{description.slice(0, 105)}</p>
          <a href={key} target="_blank" className="btn btn-sm btn-primary">
            Read More...
          </a>
        </div>
      </div>
    </div>
  );
}

export default NewsItem;
