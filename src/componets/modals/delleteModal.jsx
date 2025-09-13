import React from 'react';
import Modal from 'react-modal';

const DeleteModal = ({ isOpen, onRequestClose, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal"
      overlayClassName="overlay"
    >
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete this task?</p>
      <div className="modal-actions">
        <button
          onClick={() => {
            onConfirm();
            onRequestClose();
          }}
        >
          Yes, Delete
        </button>
        <button onClick={onRequestClose}>Cancel</button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
