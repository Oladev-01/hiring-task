import React, { useEffect, useState } from 'react';
import './Styles/HomePage.css';
import { Link, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const Homepage = () => {
  const currentYear = new Date().getFullYear();
  const gravatarUrl = localStorage.getItem('gravatarUrl') || './src/assets/grav.png';
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(false);
  const [dueDate, setDueDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [plans, setPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [filter, setFilter] = useState('All');
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const getTodo = await fetch('http://localhost:8000/api/v1/todos', {
        method: 'GET',
        headers: {
          'Authorization': token,
        }
      });
      if (!getTodo.ok) {
        throw new Error('Failed to load plans');
      }
      const data = await getTodo.json();
      setPlans(data);
    }catch(error) {
      console.error(error);
    }
  }
  
  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('gravatarUrl');
    navigate('/login');
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };


  const handleCreateTodo = async (e) => {
    e.preventDefault();
    const formattedDate = dueDate ? dueDate.toISOString() : null;
    try {
      const sendTodo = await fetch('http://localhost:8000/api/v1/todos', {
        method: 'POST',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, status, dueDate: formattedDate })
      });
      if (!sendTodo.ok) {
        throw new Error('Failed to add plan');
      }
      fetchPlans();
      setTitle('');
      setDescription('');
    } catch (error) {
      alert(error);
    }
  };

  const filterPlans = () => {
    let filtered = [...plans];
  }

  const handleDeletePlan = async (id) => {
    try {
      const deleteTodo = await fetch(`http://localhost:8000/api/v1/todos/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': token,
        }
      });
      if (!deleteTodo.ok) {
        throw new Error('Failed to delete plan');
      }
      fetchPlans();
    } catch (error) {
      alert(error);
    }
  };
  
  const handleUpdatePlan = async (id, updates) => {
    try {
      const updateTodo = await fetch(`http://localhost:8000/api/v1/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates)
      });
      if (!updateTodo.ok) {
        throw new Error('Failed to update plan');
      }
      fetchPlans();
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="homepage">
      <header className='project-header'>
        <h1 className='task-master'><Link to="/">Task Master</Link></h1>
        <ul id="navlink">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/services">Services</Link></li>    
          <li><Link to="/contact">Contact</Link></li>
        </ul>
        <div className="btn">
          <img 
            src={gravatarUrl} 
            alt="profile" 
            onClick={toggleMenu} 
          />
          <ul className={`dropdown ${showMenu ? 'show-dropdown' : ''}`}>
            <li><Link to="/profile">Profile</Link></li>
            <li onClick={handleLogOut} style={{ cursor: 'pointer' }}>Logout</li>
          </ul>
        </div>
      </header>
      <div className="content">
      <div className="your-plan">
          <form className='add-todo' onSubmit={handleCreateTodo}>
            <h2>Create your plan</h2>
            <input 
              type="text" 
              placeholder='Title' 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input 
              type="text" 
              placeholder='Describe your plan' 
              value={description}
              onChange={(e) => setDescription(e.target.value)} 
              required
            />
            <span>
              <input type='date' onChange={(e) => setDueDate(new Date(e.target.value))} 
              />
              <div className="add" onClick={handleCreateTodo} style={{ cursor: 'pointer' }}>ADD</div>
            </span>
          </form>
        </div>
        <div className="plans">
          <ul>
            {plans.map((plan) => (
              <li key={plan.uuid}>
                <div className="plan">
                  <input type='checkbox' checked={plan.status} name='status' onChange={() => handleUpdatePlan(plan.uuid, { status: !plan.status})}></input>
                  <div className="plan-info">
                    <h3>{plan.title}</h3>
                    <p>{plan.description}</p>
                    <p id='date'>{plan.dueDate ? new Date(plan.dueDate).toDateString() : 'No due date'}</p>
                  </div>
                  <div className="plan-actions">
                  <i className="fa-solid fa-pencil"></i>
                  <i className="fa-solid fa-trash" onClick={() => handleDeletePlan(plan.uuid)}></i>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <footer className="landing-footer">
        <p>&copy; {currentYear} Task Master. All rights reserved.</p>
      </footer>
    </div>
  );
};
