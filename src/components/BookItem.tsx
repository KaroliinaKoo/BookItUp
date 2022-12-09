import React, { useState } from "react";
import {
  VolumeFormattedType,
  formatStringArray,
} from "../queries/utils/formatVolumeData";
import VolumeDetails from "./VolumeDetails";

type PropTypes = {
  item: VolumeFormattedType;
  isListItem?: boolean;
};

function BookItem({ item, isListItem = true }: PropTypes) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      {showDetails && (
        <VolumeDetails
          volumeData={item}
          handleClose={() => setShowDetails(false)}
        />
      )}

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
                isListItem ? "" : "expanded"
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
        {isListItem && (
          <button
            className="volume-details-btn btn btn-secondary small"
            onClick={() => {
              setShowDetails(true);
            }}
          >
            Read more
          </button>
        )}
      </div>
    </>
  );
}

export default BookItem;
