import React from 'react';
import { Link } from 'react-router-dom';
import './Styles/LandingPage.css';

export const LandingPage = () => {
    const currentYear = new Date().getFullYear();
  return (
    <div className="landing-page">
      <header className='project-header'>
      <h1 className='task-master'><Link to="/">Task Master</Link></h1>
      <ul id="navlink">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/services">Services</Link></li>    
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      <div className="btn">
        <span className='login'><Link to="/login">Login </Link></span>
        <span className='signup'><Link to="/signup">Sign Up</Link></span>
      </div>
      </header>
      <main className='landing-body'>
        <div className='first-half'>
          <div className='first-half-content'>
          <h1 className='main-heading'><strong>Task Master: The To-Do List That Works for You.</strong></h1>
          <p className='content-p'>Say goodbye to endless lists that you never use. With its sleek design and innovative features, Task Master is the ultimate productivity tool you'll actually want to use every day.</p>
          <p className='get-started'><Link to="/signup">Get Started</Link></p>
          </div>
         <div className="img"> </div>
        </div>
        <div className='second-half'>
        <div className="img1"> </div>
          <div className='second-half-content'>
          <h1 className='second-heading'><strong>Run your life like a pro</strong></h1>
          <p className='content-p'>Organize all your to-do’s into lists and projects. Set priorities and categories to stay on track. Boost your productivity with notes, subtasks, and attachments. Achieve more with shared lists and assigned tasks.</p>
          <p className='get-started'><Link to="/signup">Get Started</Link></p>
          </div>
        </div>
        <div className='last-img'></div>
     </main>
        <footer className="landing-footer">
          <p>&copy; {currentYear} Task Master. All rights reserved.</p>
        </footer>
    </div>
  );
};
