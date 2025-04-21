# Task Manager Application

A React-based task management application with sorting, filtering, and persistent storage.

## Features

- Create, edit, and delete tasks
- Sort tasks by title, due date, priority, or status
- Filter tasks by status, priority, or search text
- Mark tasks as complete/incomplete
- Visual indicators for task priority and due dates
- Local storage persistence
- Responsive design for all screen sizes
- Dark/light mode toggle

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher) and npm

### Installation

1. Clone the repository or download the source code:
bash
```
git clone <repository-url>
cd task-manager
```

2. Install dependencies:
bash
```
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

### Project Structure

```
task-manager/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── AddTaskForm.js      # Form for adding new tasks
│   │   ├── EditTaskModal.js    # Modal for editing tasks
│   │   ├── TaskCard.js         # Individual task display
│   │   ├── TaskFilters.js      # Filtering controls
│   │   ├── TaskList.js         # List of tasks with sorting
│   │   └── ThemeToggle.js      # Light/dark mode toggle
│   ├── contexts/
│   │   └── TaskContext.js      # State management
│   ├── hooks/
│   │   └── useLocalStorage.js  # Custom hook for localStorage
│   ├── utils/
│   │   └── helpers.js          # Utility functions
│   ├── App.css                 # Main styles
│   ├── App.js                  # Main application component
│   └── index.js                # Entry point
└── package.json
```

### Build for Production

To build the app for production, run:
bash
```
npm run build
```

This creates an optimized production build in the `build` folder that can be deployed to a web server.

## Usage

- **Add Task**: Fill in the task form and click "Add Task"
- **Edit Task**: Click the edit (pencil) icon on a task card
- **Delete Task**: Click the delete (trash) icon and confirm
- **Mark Complete**: Click the checkmark icon to toggle completion
- **Sort Tasks**: Use the dropdown and direction toggle at the top of the task list
- **Filter Tasks**: Use the filter controls in the sidebar
- **Search**: Type in the search box to filter tasks by title or description
- **Toggle Theme**: Click the sun/moon icon in the header

## Technologies Used

- React.js
- Context API for state management
- CSS for styling
- date-fns for date formatting
- Local Storage API for persistence
