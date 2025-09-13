import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';
import axios from 'axios';
import { motion } from 'framer-motion';
import log from '../utils/logger';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setEmail('');
    setPassword('');
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(false);
    setError('');
    setSuccess('');
    try {
      const response = await axios.post('http://localhost:8081/api/v1/login', {
        email,
        password,
      });
      const { token, user } = response.data;
      const userName = user.username;
      log(userName)
      localStorage.setItem('username', userName)
      localStorage.setItem('token', token);

      log(token);
      setSuccess('Login successful');
      setEmail('');
      setPassword('');
      log(response.data);

      setTimeout(() => {
        navigate('/task-board');
      }, 1500);
    } catch (err) {
      if (err.response && err.response.data) {
        const data = err.response.data;
        if (Array.isArray(data)) {
          setError(data.join('\n'));
        } else if (data.message) {
          setError(data.message);
        } else {
          setError('Something went wrong!');
        }
      } else {
        setError('Network error. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <motion.div
        className="login-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Login</h1>

        <form onSubmit={submitForm}>
          <div>
            <label htmlFor="">Email</label>
            <input
              type="text"
              autoComplete="off"
              placeholder="enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="">Password</label>
            <input
              type="password"
              autoComplete="new-password"
              placeholder="enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <p className="board-text">
            Dont have an account?{' '}
            <Link to="/" className="board-link">
              Register
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage;
