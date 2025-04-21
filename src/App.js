// src/App.js
import React, { useState, useEffect } from 'react';
import { TaskProvider } from './contexts/TaskContext';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import TaskFilters from './components/TaskFilters';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <TaskProvider>
      <div className="app">
        <header className="app-header">
          <h1>Task Manager</h1>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </header>
        <main className="app-content">
          <div className="sidebar">
            <AddTaskForm />
            <TaskFilters />
          </div>
          <TaskList />
        </main>
      </div>
    </TaskProvider>
  );
}

export default App;
