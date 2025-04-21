// src/components/EditTaskModal.js
import React, { useState, useEffect } from 'react';
import { useTasks } from '../contexts/TaskContext';

function EditTaskModal({ task, onClose }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const [priority, setPriority] = useState(task.priority);
  const [dueDate, setDueDate] = useState(task.dueDate || '');
  const [status, setStatus] = useState(task.status);
  const { updateTask } = useTasks();

  // Format date for datetime-local input
  useEffect(() => {
    if (task.dueDate) {
      // Convert ISO string to format expected by datetime-local input
      const date = new Date(task.dueDate);
      const formattedDate = date.toISOString().slice(0, 16);
      setDueDate(formattedDate);
    }
  }, [task.dueDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('Please enter a task title');
      return;
    }
    
    const updatedTask = {
      ...task,
      title,
      description,
      priority,
      dueDate,
      status,
      updatedAt: new Date().toISOString(),
    };
    
    updateTask(updatedTask);
    onClose();
  };

  // Close modal when clicking outside
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <div className="modal-header">
          <h3 className="modal-title">Edit Task</h3>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="edit-title">Title *</label>
            <input
              type="text"
              id="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="edit-description">Description (optional)</label>
            <textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="edit-priority">Priority</label>
            <select
              id="edit-priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="Urgent">Urgent</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="edit-dueDate">Due Date</label>
            <input
              type="datetime-local"
              id="edit-dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="edit-status">Status</label>
            <select
              id="edit-status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTaskModal;
