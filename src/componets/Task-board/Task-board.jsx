import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Task-board.css';
import formatDate from '../utils/dateFormater';
import Modal from 'react-modal';
import axios from 'axios';
import log from '../utils/logger';
import DeleteModal from '../modals/delleteModal';
import EditModal from '../modals/edithModal';
import CreateTaskModal from '../modals/createTaskModal';
import CompleteTaskModal from '../modals/completeTaskModal';
Modal.setAppElement('#root');
const userName = localStorage.getItem('username');
const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDateTime, setDueDateTime] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [taskToComplete, setTaskToComplete] = useState(null);

  const navigate = useNavigate();

  //   const userId = localStorage.getItem("userId") || 1
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      fetchTask();
    }
  }, []);
  const fetchTask = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:8081/api/v1/getTasks', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setTasks(res.data);
      console.log(res.data);
    } catch (error) {
      setError('Failed to load Tasks');
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
      log('im here');
      log(taskId);
      log(token);

      await axios.delete(`http://localhost:8081/api/v1/task/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      log('this is id ', taskId);
      setTasks((prevTask) => prevTask.filter((task) => task.id !== taskId));
      log('delete success');
    } catch (error) {
      if (error.response) {
        log('delete error:', error.response.status, error.response.data);
      } else if (error.request) {
        log('delete error: no response received', error.request);
      } else {
        log('delete error: ', error.message);
      }
      setError('failed to delete Task');
    }
  };

  const editTask = async () => {
    if (!taskToEdit || !taskToEdit.id) {
      console.error('No task selected for editing');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:8081/api/v1/task/${taskToEdit.id}`,
        {
          title: taskToEdit.title,
          description: taskToEdit.description,
          dueDateTime: taskToEdit.dueDateTime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setTasks((prev) =>
        prev.map((t) => (t._id === taskToEdit._id || t.id === taskToEdit.id ? taskToEdit : t))
      );
    } catch (error) {
      log('Edit error:', error);
      setError('Failed to edit task');
    }
  };

  const addTask = async (e) => {
    console.log('Save Task clicked');
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      log(token);
      log('Save Task clicked:', { title, description, dueDateTime });
      console.log('Save Task clicked2');
      const res = await axios.post(
        'http://localhost:8081/api/v1/create',
        {
          title,
          description,
          dueDateTime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Save Task clicked3');
      setTasks((prev) => [...prev, res.data]);
      setTitle('');
      setDescription('');
      setDueDateTime('');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Add Task error:', error);

      if (error.response) {
        console.error('Response error:', error.response.data);
        console.error('Status:', error.response.status);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error message:', error.message);
      }

      setError('Failed to add task');
    }
  };

  const openCompleteModal = (task) => {
    if (!task.completed) {
      setTaskToComplete(task);
      setIsCompleteModalOpen(true);
    }
  };

  const completeTask = async (task) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:8081/api/v1/task/${task.id}`,
        { ...task, completed: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setTasks((prev) => prev.map((t) => (t.id === task.id ? { ...t, completed: true } : t)));
    } catch (error) {
      setError('Failed to mark task as completed');
    }
  };

  const sortedTask = [...tasks].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  log('Sorted tasks:', sortedTask);

  return (
    <div className="board-wrapper">
      <div className="inner-wrapper">
        <h1>{userName ? `${userName}'s TaskBoard` : 'My TaskBoard'}</h1>
        <button className="create-btn" onClick={() => setIsModalOpen(true)}>
          + Create Task
        </button>

        <ul className="task-list">
          {loading && <p>Loading list....</p>}
          {error && (
            <p
              className="error"
              style={{ color: 'red', fontSize: '18px', textAlign: 'center', margin: '7px' }}
            >
              {error}
            </p>
          )}
          {tasks.length == 0 && (
            <p style={{ color: 'lightgray', fontSize: '18px', textAlign: 'center' }}>
              No task yet. Create one?
            </p>
          )}

          {sortedTask.map((task) => (
            <li key={task.id || task._id}>
              <div className="task-left">
                <input
                  type="checkbox"
                  checked={task.completed}
                  readOnly
                  disabled={task.completed}
                  onClick={() => openCompleteModal(task)}
                />
                <div className="task-details">
                  <span>{task.title}</span>
                  <span>{task.description}</span>
                  <span>{formatDate(task.dueDateTime)}</span>
                </div>
              </div>

              <div className="task-actions">
                <button
                  className="edit-btn"
                  onClick={() => {
                    setTaskToEdit(task);
                    setIsEditOpen(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => {
                    setTaskToDelete(task.id);
                    setIsConfirmOpen(true);
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        <CreateTaskModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          dueDateTime={dueDateTime}
          setDueDateTime={setDueDateTime}
          addTask={addTask}
        />
        <DeleteModal
          isOpen={isConfirmOpen}
          onRequestClose={() => setIsConfirmOpen(false)}
          onConfirm={() => deleteTask(taskToDelete)}
        />
        <EditModal
          isOpen={isEditOpen}
          onRequestClose={() => setIsEditOpen(false)}
          task={taskToEdit}
          onChange={setTaskToEdit}
          onSubmit={editTask}
        />
        <CompleteTaskModal
          isOpen={isCompleteModalOpen}
          onRequestClose={() => setIsCompleteModalOpen(false)}
          onConfirm={completeTask}
          task={taskToComplete}
        />
        <button
          className="logout-btn"
          onClick={() => {
            localStorage.clear();
            navigate('/login');
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default TaskBoard;
