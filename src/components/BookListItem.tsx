import React from "react";
import {
  VolumeFormattedType,
  formatStringArray,
} from "../queries/utils/formatVolumeData";

type PropTypes = {
  item: VolumeFormattedType;
  longDescription?: boolean;
};

function BookItem({ item, longDescription }: PropTypes) {
  return (
    <div className="volume-info-card">
      <div className="volume-info-card-left">
        <div className="volume-header">
          {item.title && <h2 className="title">{item.title}</h2>}
          {item.subtitle && <h3 className="subtitle">{item.subtitle}</h3>}
          {item.authors && (
            <div className="volume-author">
              - {formatStringArray(item.authors)}
            </div>
          )}
        </div>
        {item.description && (
          <div
            className={`volume-info-card-description ${
              longDescription ? "expanded" : ""
            }`}
          >
            <p>{item.description}</p>
          </div>
        )}
      </div>
      <div className="volume-info-card-right">
        {item.imageLinks && (
          <img
            className="volume-info-card-cover"
            src={item.imageLinks.thumbnail}
            alt={`Cover of ${item.title}`}
          />
        )}

        <div className="detail-container">
          <div className="detail-label">
            Publisher: {item.publisher}
            {item.publishedDate && ` (${item.publishedDate})`}
          </div>

          <div className="detail-label">Language: {item.language}</div>
          <div className="detail-label">Pages: {item.pageCount}</div>
          {item.category && (
            <div className="detail-label category">
              Category: {item.category[0]}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookItem;
