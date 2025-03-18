import './App.css'
import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Category from './components/Category';

function App() {
  const [categories] = useState([
    { id: 'work', title: 'Work' },
    { id: 'personal', title: 'Personal' },
    { id: 'urgent', title: 'Urgent' },
  ]);

  const [tasks, setTasks] = useState([
    { id: 1, title: 'Example Task', description: 'Description here', category: 'work', isComplete: false },
  ]);

  const handleTaskDrop = (taskId, newCategory) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, category: newCategory } : task
    ));
  };

  const handleEditTask = (taskId) => {
    // Implement edit functionality
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleToggleComplete = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, isComplete: !task.isComplete } : task
    ));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4">
            <h1 className="text-3xl font-bold text-gray-900">
              Interactive Todo List
            </h1>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map(category => (
              <Category
                key={category.id}
                id={category.id}
                title={category.title}
                tasks={tasks.filter(task => task.category === category.id)}
                onTaskDrop={handleTaskDrop}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
                onToggleComplete={handleToggleComplete}
              />
            ))}
          </div>
        </main>
      </div>
    </DndProvider>
  );
}

export default App;
