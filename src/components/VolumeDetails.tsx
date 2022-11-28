import React from "react";
import { FaTimes } from "react-icons/fa";
import BookItem from "./BookItem";

type PropTypes = {
  volumeData: any;
  onClose: () => void;
};

const VolumeDetails = ({ volumeData, onClose }: PropTypes) => {
  return (
    <div className="modal">
      <div className="modal-content volume-details-modal">
        <button className="close-btn btn-icon" onClick={onClose}>
          <FaTimes />
        </button>
        <BookItem item={volumeData} longDescription={true} />
      </div>
    </div>
  );
};

export default VolumeDetails;
