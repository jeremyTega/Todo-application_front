import React from 'react';
import Modal from 'react-modal';

const CreateTaskModal = ({
  isOpen,
  onRequestClose,
  title,
  setTitle,
  description,
  setDescription,
  dueDateTime,
  setDueDateTime,
  addTask,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Create Task"
      className="modal"
      overlayClassName="overlay"
    >
      <h2>Create Task</h2>
      <form onSubmit={addTask} className="task-form">
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="datetime-local"
          value={dueDateTime}
          onChange={(e) => setDueDateTime(e.target.value)}
        />
        <div className="modal-actions">
          <button type="submit">Save Task</button>
          <button type="button" onClick={onRequestClose}>
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateTaskModal;
