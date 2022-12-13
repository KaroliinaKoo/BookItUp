import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import FocusTrap from "focus-trap-react";
import BookItem from "./BookItem";

type PropTypes = {
  volumeData: any;
  handleClose: () => void;
};

const VolumeDetailsModal = ({ volumeData, handleClose }: PropTypes) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [handleClose]);

  return (
    <FocusTrap active={true}>
      <div className="modal">
        <div className="modal-content volume-details-modal">
          <button className="close-btn btn-icon" onClick={handleClose}>
            <FaTimes />
          </button>
          {volumeData && (
            <BookItem
              volumeData={volumeData}
              displayDescription={{ display: true, full: true }}
              displayReviewButton={false}
              displayDetailsButton={false}
            />
          )}
        </div>
      </div>
    </FocusTrap>
  );
};

export default VolumeDetailsModal;
