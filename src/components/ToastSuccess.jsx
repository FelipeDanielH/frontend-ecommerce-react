// src/components/ToastSuccess.jsx
import { useEffect } from "react";

export default function ToastSuccess({ show, onClose, message }) {
  useEffect(() => {
    if (show) {
      const toastEl = document.getElementById("carritoToast");
      const bsToast = bootstrap.Toast.getOrCreateInstance(toastEl);
      bsToast.show();
    }
  }, [show]);

  return (
    <div
      id="carritoToast"
      className="toast position-fixed bottom-0 end-0 m-4 text-bg-success"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="toast-header bg-success text-white">
        <i className="bi bi-check-circle-fill me-2"></i>
        <strong className="me-auto">Carrito</strong>
        <button
          type="button"
          className="btn-close btn-close-white"
          data-bs-dismiss="toast"
          aria-label="Close"
          onClick={onClose}
        ></button>
      </div>
      <div className="toast-body">{message}</div>
    </div>
  );
}
