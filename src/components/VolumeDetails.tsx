import React from "react";
import { FaTimes } from "react-icons/fa";
import BookItem from "./BookItem";
import FocusTrap from "focus-trap-react";

type PropTypes = {
  volumeData: any;
  onClose: () => void;
};

const VolumeDetails = ({ volumeData, onClose }: PropTypes) => {
  document.querySelector("body")?.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  });

  return (
    <FocusTrap active={true}>
      <div className="modal">
        <div className="modal-content volume-details-modal">
          <button className="close-btn btn-icon" onClick={onClose}>
            <FaTimes />
          </button>
          <BookItem item={volumeData} longDescription={true} />
        </div>
      </div>
    </FocusTrap>
  );
};

export default VolumeDetails;
