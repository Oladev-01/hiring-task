import React, { useState } from 'react';
import '../Styles/Signup.css';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [username, setUsername] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email, password, passwordConfirmation, username);
        return (
            <div className='signup'>
                <form onSubmit={handleSubmit}>
                    <div className='signup_container'>
                        <label htmlFor='username'>Username</label>
                        <input type='text' id='username' value={username} onChange={(e) => setUsername(e.target.value)} required />
                        <label htmlFor='email'>Email</label>
                        <input type='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <label htmlFor='password'>Password</label>
                        <input type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <label htmlFor='passwordConfirmation'>Confirm Password</label>
                        <input type='password' id='passwordConfirmation' value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} required />
                    </div>
                </form>
            </div>
        )
    }
}

export default Signup;
