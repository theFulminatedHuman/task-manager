// src/components/TaskList.js
import React from 'react';
import { useTasks } from '../contexts/TaskContext';
import TaskCard from './TaskCard';

function TaskList() {
  const { filteredTasks, sorting, setSorting } = useTasks();

  const handleSortFieldChange = (e) => {
    setSorting(e.target.value, sorting.direction);
  };

  const toggleSortDirection = () => {
    const newDirection = sorting.direction === 'asc' ? 'desc' : 'asc';
    setSorting(sorting.field, newDirection);
  };

  return (
    <div className="task-list-container">
      <div className="sort-controls">
        <select
          value={sorting.field}
          onChange={handleSortFieldChange}
        >
          <option value="title">Sort by Title</option>
          <option value="dueDate">Sort by Due Date</option>
          <option value="priority">Sort by Priority</option>
          <option value="status">Sort by Status</option>
        </select>
        <button
          className="sort-direction"
          onClick={toggleSortDirection}
          title={sorting.direction === 'asc' ? 'Ascending' : 'Descending'}
        >
          {sorting.direction === 'asc' ? '↑' : '↓'}
        </button>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📝</div>
          <p className="empty-state-text">No tasks found. Add a new task to get started!</p>
        </div>
      ) : (
        <div className="task-list">
          {filteredTasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskList;
