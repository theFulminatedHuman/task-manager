// src/components/TaskCard.js
import React, { useState } from 'react';
import { format, formatDistanceToNow, isPast, isWithinInterval, addDays } from 'date-fns';
import { useTasks } from '../contexts/TaskContext';
import EditTaskModal from './EditTaskModal';

function TaskCard({ task }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { toggleTaskCompletion, deleteTask } = useTasks();

  const handleToggleCompletion = () => {
    toggleTaskCompletion(task.id);
  };

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    deleteTask(task.id);
    setShowDeleteConfirm(false);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  // Format due date and check if overdue or upcoming
  const formatDueDate = () => {
    if (!task.dueDate) return null;

    const dueDate = new Date(task.dueDate);
    const isOverdue = isPast(dueDate) && task.status !== 'Completed';
    
    // Check if due date is within 24 hours
    const isSoon = !isOverdue && isWithinInterval(dueDate, {
      start: new Date(),
      end: addDays(new Date(), 1)
    });

    const formattedDate = format(dueDate, 'MMM d, yyyy h:mm a');
    const timeRemaining = formatDistanceToNow(dueDate, { addSuffix: true });

    return (
      <div className={`task-due-date ${isOverdue ? 'overdue' : isSoon ? 'soon' : ''}`}>
        <span>Due: {formattedDate}</span>
        <span>({timeRemaining})</span>
      </div>
    );
  };

  return (
    <>
      <div 
        className={`task-card card ${task.status === 'Completed' ? 'completed' : ''} priority-${task.priority.toLowerCase()}`}
      >
        <div className="task-header">
          <h3 className="task-title">{task.title}</h3>
          <div className="task-actions">
            <button onClick={handleToggleCompletion} title={task.status === 'Completed' ? 'Mark as incomplete' : 'Mark as complete'}>
              {task.status === 'Completed' ? '↩' : '✓'}
            </button>
            <button onClick={handleEdit} title="Edit task">✎</button>
            <button onClick={handleDelete} title="Delete task">🗑</button>
          </div>
        </div>
        
        <div className="task-body">
          {task.description && (
            <p className="task-description">{task.description}</p>
          )}
          
          <div className="task-meta">
            {formatDueDate()}
            
            <div className="task-badges">
              <span className={`task-priority ${task.priority.toLowerCase()}`}>
                {task.priority}
              </span>
              <span className={`task-status ${task.status.toLowerCase().replace(' ', '-')}`}>
                {task.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      {showEditModal && (
        <EditTaskModal task={task} onClose={() => setShowEditModal(false)} />
      )}

      {showDeleteConfirm && (
        <div className="modal-overlay">
          <div className="modal confirm-dialog">
            <div className="confirm-dialog-message">
              <p>Are you sure you want to delete this task?</p>
              <p><strong>{task.title}</strong></p>
            </div>
            <div className="confirm-dialog-actions">
              <button onClick={cancelDelete} className="btn btn-secondary">Cancel</button>
              <button onClick={confirmDelete} className="btn btn-danger">Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TaskCard;
