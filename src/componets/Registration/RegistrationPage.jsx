import React, { useState, useEffect } from 'react';
import './RegistrationPage.css';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

function RegistrationPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

   useEffect(() => {
    setUsername('');
    setEmail('');
    setPassword('');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const response = await axios.post('http://localhost:8081/api/v1/register', {
        username,
        email,
        password,
      });
      setSuccess('Registration successful');
      setUsername('');
      setEmail('');
      setPassword('');
      console.log(response.data);
      setTimeout(() => {
        navigate('/login');
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
    <div
      className="wrapper">
      <motion.div
       className="registration-container"
       initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
        <h1>Registration</h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Username: </label>
            <input
              type="text"
               autoComplete="off"
              placeholder="enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label>Email: </label>
            <input
              type="text"
               autoComplete="off"
              placeholder="enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Password: </label>
            <input
              type="password"
               autoComplete="new-password"
              placeholder="enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* 🔹 Success & Error Messages */}
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

          <button type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>

          <p className="login-text">
            Already have an account?{' '}
            <Link to="/login" className="login-link">
              Login
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}

export default RegistrationPage;
