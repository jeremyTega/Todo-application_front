import React from 'react';
import Modal from 'react-modal';

const CompleteTaskModal = ({ isOpen, onRequestClose, onConfirm, task }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal"
      overlayClassName="overlay"
      contentLabel="Complete Task Confirmation"
    >
      <h2>Mark Task as Done</h2>
      <p>Do you want to mark "{task?.title}" as done?</p>
      <div className="modal-actions">
        <button
          onClick={() => {
            onConfirm(task);
            onRequestClose();
          }}
        >
          Yes
        </button>
        <button onClick={onRequestClose}>No</button>
      </div>
    </Modal>
  );
};

export default CompleteTaskModal;
