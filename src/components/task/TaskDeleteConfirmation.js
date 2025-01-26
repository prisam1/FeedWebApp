import React from "react";
import { Modal } from "../../uiComponents/Modal";
import { Button } from "../../uiComponents/Button";

export const ConfirmationModal = ({ isOpen, onConfirm, onCancel, loading }) => {
  if (!isOpen) return null;

  return (
    <Modal onClose={onCancel}>
      <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
      <p className="text-gray-600 mb-6">
        Are you sure you want to delete this task? This action cannot be undone.
      </p>
      <div className="flex justify-end gap-4">
        <Button onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          disabled={loading}
          className="bg-red-500 hover:bg-red-600"
        >
          {loading ? "Deleting..." : "Confirm"}
        </Button>
      </div>
    </Modal>
  );
};
