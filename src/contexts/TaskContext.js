// src/contexts/TaskContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';

const TaskContext = createContext();

const initialState = {
  tasks: [],
  filters: {
    status: 'all',
    priority: 'all',
    search: '',
  },
  sorting: {
    field: 'dueDate',
    direction: 'asc',
  },
};

function taskReducer(state, action) {
  switch (action.type) {
    case 'LOAD_TASKS':
      return { ...state, tasks: action.payload };
    
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task => 
          task.id === action.payload.id ? action.payload : task
        ),
      };
    
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };
    
    case 'TOGGLE_TASK_COMPLETION':
      return {
        ...state,
        tasks: state.tasks.map(task => 
          task.id === action.payload 
            ? { ...task, status: task.status === 'Completed' ? 'Not Started' : 'Completed' } 
            : task
        ),
      };
    
    case 'SET_FILTER':
      return {
        ...state,
        filters: { ...state.filters, [action.payload.filterType]: action.payload.value },
      };
    
    case 'RESET_FILTERS':
      return {
        ...state,
        filters: {
          status: 'all',
          priority: 'all',
          search: '',
        },
      };
    
    case 'SET_SORTING':
      return {
        ...state,
        sorting: {
          field: action.payload.field,
          direction: action.payload.direction,
        },
      };
    
    default:
      return state;
  }
}

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      dispatch({ type: 'LOAD_TASKS', payload: JSON.parse(savedTasks) });
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
  }, [state.tasks]);

  // Helper functions
  const addTask = (task) => {
    dispatch({ type: 'ADD_TASK', payload: { ...task, id: Date.now().toString() } });
  };

  const updateTask = (task) => {
    dispatch({ type: 'UPDATE_TASK', payload: task });
  };

  const deleteTask = (taskId) => {
    dispatch({ type: 'DELETE_TASK', payload: taskId });
  };

  const toggleTaskCompletion = (taskId) => {
    dispatch({ type: 'TOGGLE_TASK_COMPLETION', payload: taskId });
  };

  const setFilter = (filterType, value) => {
    dispatch({ type: 'SET_FILTER', payload: { filterType, value } });
  };

  const resetFilters = () => {
    dispatch({ type: 'RESET_FILTERS' });
  };

  const setSorting = (field, direction) => {
    dispatch({ type: 'SET_SORTING', payload: { field, direction } });
  };

  // Apply filters and sorting
  const getFilteredAndSortedTasks = () => {
    const { status, priority, search } = state.filters;
    const { field, direction } = state.sorting;

    let filteredTasks = [...state.tasks];

    // Apply status filter
    if (status !== 'all') {
      filteredTasks = filteredTasks.filter(task => task.status === status);
    }

    // Apply priority filter
    if (priority !== 'all') {
      filteredTasks = filteredTasks.filter(task => task.priority === priority);
    }

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filteredTasks = filteredTasks.filter(task => 
        task.title.toLowerCase().includes(searchLower) || 
        (task.description && task.description.toLowerCase().includes(searchLower))
      );
    }

    // Apply sorting
    filteredTasks.sort((a, b) => {
      let valueA, valueB;

      // Handle different field types
      if (field === 'dueDate') {
        valueA = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
        valueB = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
      } else if (field === 'priority') {
        // Define priority order
        const priorityOrder = { 'Urgent': 0, 'High': 1, 'Medium': 2, 'Low': 3 };
        valueA = priorityOrder[a.priority];
        valueB = priorityOrder[b.priority];
      } else {
        // Default string comparison for title and other fields
        valueA = a[field]?.toLowerCase() || '';
        valueB = b[field]?.toLowerCase() || '';
      }

      // Apply direction
      if (direction === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });

    return filteredTasks;
  };

  return (
    <TaskContext.Provider value={{
      tasks: state.tasks,
      filters: state.filters,
      sorting: state.sorting,
      filteredTasks: getFilteredAndSortedTasks(),
      addTask,
      updateTask,
      deleteTask,
      toggleTaskCompletion,
      setFilter,
      resetFilters,
      setSorting,
    }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}
