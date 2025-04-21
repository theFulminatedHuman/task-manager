// src/utils/helpers.js
import { format, formatDistanceToNow, isPast, isWithinInterval, addDays } from 'date-fns';

// Check if a task is overdue
export function isTaskOverdue(task) {
  if (!task.dueDate || task.status === 'Completed') return false;
  return isPast(new Date(task.dueDate));
}

// Check if a task is due soon (within 24 hours)
export function isTaskDueSoon(task) {
  if (!task.dueDate || task.status === 'Completed' || isTaskOverdue(task)) return false;
  
  const dueDate = new Date(task.dueDate);
  return isWithinInterval(dueDate, {
    start: new Date(),
    end: addDays(new Date(), 1)
  });
}

// Format the due date for display
export function formatTaskDueDate(dueDate) {
  if (!dueDate) return '';
  return format(new Date(dueDate), 'MMM d, yyyy h:mm a');
}

// Get time remaining until due date
export function getTimeRemaining(dueDate) {
  if (!dueDate) return '';
  return formatDistanceToNow(new Date(dueDate), { addSuffix: true });
}

// Get priority class for styling
export function getPriorityClass(priority) {
  switch (priority) {
    case 'Urgent': return 'urgent';
    case 'High': return 'high';
    case 'Medium': return 'medium';
    case 'Low': return 'low';
    default: return '';
  }
}

// Get status class for styling
export function getStatusClass(status) {
  return status.toLowerCase().replace(' ', '-');
}
