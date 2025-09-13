import React from 'react';
import Modal from 'react-modal';

const EditModal = ({ isOpen, onRequestClose, task, onChange, onSubmit }) => {
  if (!task) return null; // don't render if no task to edit

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal"
      overlayClassName="overlay"
    >
      <h2>Edit Task</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
          onRequestClose();
        }}
        className="task-form"
      >
        <input
          type="text"
          value={task.title}
          onChange={(e) => onChange({ ...task, title: e.target.value })}
          placeholder="Task Title"
          required
        />
        <textarea
          value={task.description}
          onChange={(e) => onChange({ ...task, description: e.target.value })}
          placeholder="Task Description"
          required
        />
        <input
          type="datetime-local"
          value={
            task.dueDateTime
              ? new Date(task.dueDateTime).toISOString().slice(0, 16)
              : ''
          }
          onChange={(e) => onChange({ ...task, dueDateTime: e.target.value })}
        />
        <div className="modal-actions">
          <button type="submit">Save Changes</button>
          <button type="button" onClick={onRequestClose}>
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditModal;
