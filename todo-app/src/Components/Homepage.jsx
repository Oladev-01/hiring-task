import React, { useEffect, useState } from 'react';
import './Styles/HomePage.css';
import { Link, useNavigate } from 'react-router-dom';

export const Homepage = () => {
  const currentYear = new Date().getFullYear();
  const gravatarUrl = localStorage.getItem('gravatarUrl') || './src/assets/grav.png';
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(false);
  const [dueDate, setDueDate] = useState(null);
  const [plans, setPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [filter, setFilter] = useState('All');
  const [searchItem, setSearchItem] = useState('');
  const [editPlan, setEditPlan] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editDueDate, setEditDueDate] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchPlans();
  }, []);

  useEffect(() => {
    filterPlans();
  }, [filter, plans, searchItem]);

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
      console.log(data);
      setPlans(data);
    } catch (error) {
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
      setDueDate(new Date().toISOString().split('T')[0]);
    } catch (error) {
      alert(error);
    }
  };

  const filterPlans = () => {
    let filtered = [...plans];
    if (filter === 'Title') {
      if (searchItem) {
        filtered = filtered.filter(plan => {
          return plan.title.toLowerCase().includes(searchItem.toLowerCase());
        });
      }
    } else if (filter === 'Completed') {
      filtered = filtered.filter(plan => {
        return plan.status === true;
      });
    } else if (filter === 'Active') {
      filtered = filtered.filter(plan => {
        return plan.status === false;
      });
    } else if (filter === 'Most recent') {
      filtered = filtered
        .filter(plan => plan.dueDate)
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
        .slice(0, 20);
    }
    setFilteredPlans(filtered);
  };

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
  };

  const handleEditClick = (plan) => {
    setEditPlan(plan.uuid);
    setEditTitle(plan.title);
    setEditDescription(plan.description);
    setEditDueDate(plan.dueDate ? new Date(plan.dueDate) : null);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedDate = editDueDate ? editDueDate.toISOString() : null;
      await handleUpdatePlan(editPlan, {
        title: editTitle,
        description: editDescription,
        dueDate: formattedDate,
      });
      setEditPlan(null);
    } catch (error) {
      alert('Failed to update the plan');
    }
  };

  const handleCancelEdit = () => {
    setEditPlan(null); // Cancel edit mode
  };

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
              <input type='date' onChange={(e) => setDueDate(new Date(e.target.value))} />
              <div className="add" onClick={handleCreateTodo} style={{ cursor: 'pointer' }}>ADD</div>
            </span>
          </form>
        </div>
        <div className="filter-container">
          <span>Filter</span>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Title">Title</option>
            <option value="Completed">Completed</option>
            <option value="Active">Active</option>
            <option value="Most recent">Most Recent</option>
          </select>
          {filter === "Title" && (
            <input
              type="text"
              placeholder="Search by title"
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
              className="title-search-input"
            />
          )}
        </div>
        <div className="plans">
          <ul>
            {filteredPlans.map((plan) => (
              <li key={plan.uuid}>
                <div className="plan">
                  {editPlan === plan.uuid ? (
                    <form className="edit-form" onSubmit={handleEditSubmit}>
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        placeholder="Edit Title"
                        required
                      />
                      <input
                        type='text'
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        placeholder="Edit Description"
                        required
                      />
                      <input
                        type="date"
                        value={editDueDate ? editDueDate.toISOString().slice(0, 10) : ''}
                        onChange={(e) => setEditDueDate(new Date(e.target.value))}
                      />
                      <div className="edit-actions">
                        <button type="submit">Save</button>
                        <button type="button" onClick={handleCancelEdit}>
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <input
                        type='checkbox'
                        checked={plan.status}
                        name='status'
                        onChange={() => handleUpdatePlan(plan.uuid, { status: !plan.status })}
                      />
                      <div className="plan-info">
                        <h3>{plan.title}</h3>
                        <p id='desc'>{plan.description}</p>
                        <p id='date'>{plan.dueDate ? new Date(plan.dueDate).toLocaleDateString() : 'No due date'}</p>
                      </div>
                      <div className="plan-actions">
                        <i className="fa-solid fa-pencil" onClick={() => handleEditClick(plan)}></i>
                        <i className="fa-solid fa-trash" onClick={() => handleDeletePlan(plan.uuid)}></i>
                      </div>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <footer className="footer">
        <p>&copy; {currentYear} Task Master. All rights reserved.</p>
      </footer>
    </div>
  );
}
