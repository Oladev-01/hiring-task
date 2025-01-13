import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "../Styles/Login.css"

export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json",
                },
                body: JSON.stringify({ email, password })
            }
            );

            if (!response.ok) {
                throw new Error('Login failed')
            }
            const data = await response.json();
            if (data.token) {
                localStorage.setItem('token', data.token);
                setSuccess('Login success');
                setTimeout(() => {
                    setSuccess('');
                }, 1000);
            }
        } catch (error) {
            setError(error.message);
            setTimeout(() => {
                setError('');
            }, 1000);
        }
    }
    return (
        <div className='page-container'>
            <header className='project-header'><h1 className='task-master'>Task Master</h1>
            </header>
            <div className="login-container">
            <h2>Login</h2>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            <form onSubmit={handleSubmit}>
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
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </div>
            <button type="submit">Login</button>
            </form>
            <p className="signup-link">
                Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
        </div>
        </div>
    )
}

