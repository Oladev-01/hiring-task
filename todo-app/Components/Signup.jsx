import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import '../Styles/Signup.css';

export const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPasswordMatch, setShowPasswordMatch] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, username }),
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      const data = await response.json();
      setSuccess('Signup successful');
    } catch (error) {
      setError(error.message);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value === '' && passwordConfirmation === '') {
      setShowPasswordMatch(false);
    } else {
      setShowPasswordMatch(true);
    }
  };

  const handlePasswordConfirmationChange = (e) => {
    setPasswordConfirmation(e.target.value);
    if (password === '' && e.target.value === '') {
      setShowPasswordMatch(false);
    } else {
      setShowPasswordMatch(true);
    }
  };

  const passwordsMatch = password === passwordConfirmation;

  return (
   <div className='page-container'>
      <header className='project-header'><h1 className='task-master'>Task Master</h1>
      </header>
      <div className="signup-container">
        <h2>Sign Up</h2>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor='username'>Username</label>
            <input
              type="name"
              id="username"
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor='email'>Email</label>
            <input
              type="email"
              id="email"
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder='Enter your password'
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="passwordConfirmation">Confirm Password</label>
            <input
              type="password"
              id="passwordConfirmation"
              value={passwordConfirmation}
              onChange={handlePasswordConfirmationChange}
              required
            />
            {showPasswordMatch && (
              <p className={passwordsMatch ? 'match' : 'no-match'}>
                {passwordsMatch ? 'Passwords match' : 'Passwords do not match!'}
              </p>
            )}
          </div>
          <button type="submit" disabled={!passwordsMatch}>Sign Up</button>
        </form>
        <p className="login-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
      </div>
    </div>
  );
};
