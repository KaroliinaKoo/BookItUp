import { FaTimes } from "react-icons/fa";
import React from "react";

export type PropTypes = {
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  title?: string;
  visible?: boolean;
};

function Prompt({
  message,
  onConfirm,
  onCancel,
  confirmText,
  cancelText,
  title,
  visible,
}: PropTypes) {
  return (
    <div className="modal" style={{ display: visible ? "block" : "none" }}>
      <div className="modal-content">
        <FaTimes
          role="button"
          aria-label="Close"
          className="close"
          onClick={onCancel}
        />
        <h2>{title ?? "Confirm Action"}</h2>
        <p>{message ?? "Are you sure?"}</p>
        <div className="btn-container">
          <button onClick={onCancel} className="btn-secondary small">
            {cancelText ?? "Cancel"}
          </button>
          <button onClick={onConfirm} className="btn-primary small">
            {confirmText ?? "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Prompt;
