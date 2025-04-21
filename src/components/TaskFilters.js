// src/components/TaskFilters.js
import React from 'react';
import { useTasks } from '../contexts/TaskContext';

function TaskFilters() {
  const { filters, setFilter, resetFilters } = useTasks();

  const handleStatusFilterChange = (e) => {
    setFilter('status', e.target.value);
  };

  const handlePriorityFilterChange = (e) => {
    setFilter('priority', e.target.value);
  };

  const handleSearchChange = (e) => {
    setFilter('search', e.target.value);
  };

  const handleResetFilters = () => {
    resetFilters();
  };

  return (
    <div className="task-filters card">
      <h2 className="form-title">Filter Tasks</h2>
      
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search tasks..."
          value={filters.search}
          onChange={handleSearchChange}
        />
      </div>
      
      <div className="filter-group">
        <label htmlFor="status-filter">Status</label>
        <select
          id="status-filter"
          value={filters.status}
          onChange={handleStatusFilterChange}
        >
          <option value="all">All Statuses</option>
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      
      <div className="filter-group">
        <label htmlFor="priority-filter">Priority</label>
        <select
          id="priority-filter"
          value={filters.priority}
          onChange={handlePriorityFilterChange}
        >
          <option value="all">All Priorities</option>
          <option value="Urgent">Urgent</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
      
      <div className="filter-actions">
        <button onClick={handleResetFilters} className="btn btn-secondary">
          Reset Filters
        </button>
      </div>
    </div>
  );
}

export default TaskFilters;
