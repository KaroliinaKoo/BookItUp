import React from "react";
import { FormattedVolumeType } from "../context/VolumeContext";

type PropTypes = {
  item: FormattedVolumeType;
  longDescription?: boolean;
};

function BookItem({ item, longDescription }: PropTypes) {
  return (
    <div className="volume-info-card">
      <div className="volume-info-card-left">
        <div className="volume-title">
          <h2 className="heading-title">{item.title}</h2>
          <h3 className="subtitle">{item.subtitle}</h3>
          <div className="volume-author">- {item.authors}</div>
        </div>
        <div
          className={`volume-info-card-description ${
            longDescription ? "expanded" : ""
          }`}
        >
          <p>{item.description}</p>
        </div>
      </div>
      <div className="volume-info-card-right">
        <img
          className="volume-info-card-cover"
          src={item.imageLinks["thumbnail"]}
          alt={`Cover of ${item.title}`}
        />
        <div className="detail-container">
          <div className="detail-label">
            Publisher: {item.publisher}
            {", "}
            {item.publishedDate}
          </div>
          <div className="detail-label">Language: {item.language}</div>
          <div className="detail-label">Pages: {item.pageCount}</div>
          <div className="detail-label category">Category: {item.category}</div>
        </div>
      </div>
    </div>
  );
}

export default BookItem;
