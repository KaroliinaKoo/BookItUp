import { FaTimes } from "react-icons/fa";

function Prompt({
  message,
  onConfirm,
  onCancel,
  confirmText,
  cancelText,
  title,
  visible,
}) {
  return (
    <div className="modal" style={{ display: visible ? "block" : "none" }}>
      <div className="modal-content">
        <FaTimes
          role="button"
          aria-label="Close"
          className="close"
          onClick={onCancel}
        />
        <h2>{title}</h2>
        <p>{message ? message : "Are you sure?"}</p>
        <div className="btn-container">
          <button onClick={onCancel} className="btn-secondary small">
            {cancelText ? cancelText : "Cancel"}
          </button>
          <button onClick={onConfirm} className="btn-primary small">
            {confirmText ? confirmText : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Prompt;
