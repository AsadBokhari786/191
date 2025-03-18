import { render, screen, fireEvent } from '@testing-library/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Task from './Task';

// Wrap component with DND provider for testing
const TaskWrapper = (props) => (
  <DndProvider backend={HTML5Backend}>
    <Task {...props} />
  </DndProvider>
);

describe('Task Component', () => {
  const mockTask = {
    id: 1,
    title: 'Test Task',
    description: 'Test Description',
    category: 'work',
    isComplete: false,
  };

  const mockHandlers = {
    onEdit: jest.fn(),
    onDelete: jest.fn(),
    onToggleComplete: jest.fn(),
    onUpdateTask: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders task with title and description', () => {
    render(<TaskWrapper {...mockTask} {...mockHandlers} />);
    
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  test('toggles task completion status', () => {
    render(<TaskWrapper {...mockTask} {...mockHandlers} />);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    expect(mockHandlers.onToggleComplete).toHaveBeenCalledWith(mockTask.id);
  });

  test('handles edit button click', () => {
    render(<TaskWrapper {...mockTask} {...mockHandlers} />);
    
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);
    
    expect(mockHandlers.onEdit).toHaveBeenCalledWith(mockTask.id);
  });

  test('handles delete button click', () => {
    render(<TaskWrapper {...mockTask} {...mockHandlers} />);
    
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);
    
    expect(mockHandlers.onDelete).toHaveBeenCalledWith(mockTask.id);
  });

  test('displays edit form when isEditing is true', () => {
    render(
      <TaskWrapper
        {...mockTask}
        {...mockHandlers}
        isEditing={true}
      />
    );
    
    expect(screen.getByDisplayValue('Test Task')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Description')).toBeInTheDocument();
  });

  test('applies completed styling when task is complete', () => {
    render(
      <TaskWrapper
        {...mockTask}
        {...mockHandlers}
        isComplete={true}
      />
    );
    
    const title = screen.getByText('Test Task');
    expect(title.className).toContain('line-through');
  });

  test('task is draggable', () => {
    render(<TaskWrapper {...mockTask} {...mockHandlers} />);
    
    const taskElement = screen.getByText('Test Task').closest('div[draggable]');
    expect(taskElement).toHaveAttribute('draggable');
  });
});