import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Task from './Task';

// Mock react-dnd
jest.mock('react-dnd', () => ({
  useDrag: () => [{ isDragging: false }, jest.fn()],
  DndProvider: ({ children }) => children
}));

// Mock react-dnd-html5-backend
jest.mock('react-dnd-html5-backend', () => ({
  HTML5Backend: {}
}));

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
  };

  it('renders task title', () => {
    render(
      <Task
        {...mockTask}
        {...mockHandlers}
      />
    );
    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });

  it('shows description when provided', () => {
    render(
      <Task
        {...mockTask}
        {...mockHandlers}
      />
    );
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('calls onToggleComplete when checkbox is clicked', () => {
    render(
      <Task
        {...mockTask}
        {...mockHandlers}
      />
    );
    const checkbox = screen.getByRole('checkbox');
    checkbox.click();
    expect(mockHandlers.onToggleComplete).toHaveBeenCalledWith(mockTask.id);
  });

  it('calls onEdit when edit button is clicked', () => {
    render(
      <Task
        {...mockTask}
        {...mockHandlers}
      />
    );
    const editButton = screen.getByText('Edit');
    editButton.click();
    expect(mockHandlers.onEdit).toHaveBeenCalledWith(mockTask.id);
  });

  it('calls onDelete when delete button is clicked', () => {
    render(
      <Task
        {...mockTask}
        {...mockHandlers}
      />
    );
    const deleteButton = screen.getByText('Delete');
    deleteButton.click();
    expect(mockHandlers.onDelete).toHaveBeenCalledWith(mockTask.id);
  });
});