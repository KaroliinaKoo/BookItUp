import React from "react";
import { VolumeTypes } from "../context/VolumeContext";
import { langCodeToString } from "../utils/langCodeToString";
import { getYear } from "../utils/getYear";
import { sanitizeString } from "../utils/sanitizeString";

type PropTypes = {
  item: VolumeTypes;
  longDescription?: boolean;
};

function BookItem({ item, longDescription }: PropTypes) {
  return (
    <div className="volume-info-card">
      <div className="volume-info-card-left">
        <div className="volume-title">
          <h2 className="heading-title">
            {item.title ? item.title : "No Title"}
          </h2>
          <h3 className="subtitle">{item.subtitle ? item.subtitle : ""}</h3>
          <div className="volume-author">
            - {item.authors ? [...item.authors].join(", ") : "No Author"}
          </div>
        </div>
        {item.description && (
          <div
            className={`volume-info-card-description ${
              longDescription ? "expanded" : ""
            }`}
          >
            <p>{sanitizeString(item.description)}</p>
          </div>
        )}
      </div>
      <div className="volume-info-card-right">
        {item.imageLinks.thumbnail ? (
          <img
            className="volume-info-card-cover"
            src={item.imageLinks.thumbnail}
            alt={`Cover of ${item.title}`}
          />
        ) : (
          <div className="volume-info-card-cover no-cover">
            <span>No cover</span>
          </div>
        )}
        <div className="detail-container">
          <div className="detail-label">
            Publisher: {item.publisher ? item.publisher : "Unknown Publisher"}
            {", "}
            {item.publishedDate ? getYear(item.publishedDate) : "Unknown Year"}
          </div>
          <div className="detail-label">
            Language:{" "}
            {item.language ? langCodeToString(item.language) : "Unknown"}
          </div>
          <div className="detail-label">
            Pages: {item.pageCount ? item.pageCount : "Unknown"}
          </div>
          <div className="detail-label category">
            Category: {item.categories ? item.categories[0] : "Unknown"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookItem;
