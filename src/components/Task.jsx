import { useDrag } from 'react-dnd';

const Task = ({ id, title, description, isComplete, category, onEdit, onDelete, onToggleComplete }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TASK',
    item: { id, category },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-4 mb-2 bg-white rounded-lg shadow ${
        isDragging ? 'opacity-50' : ''
      } ${isComplete ? 'bg-gray-50' : ''}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={isComplete}
            onChange={() => onToggleComplete(id)}
            className="h-4 w-4 text-blue-600"
          />
          <h3 className={`font-medium ${isComplete ? 'line-through text-gray-500' : ''}`}>
            {title}
          </h3>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(id)}
            className="text-blue-600 hover:text-blue-800"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(id)}
            className="text-red-600 hover:text-red-800"
          >
            Delete
          </button>
        </div>
      </div>
      {description && (
        <p className={`mt-2 text-sm ${isComplete ? 'text-gray-500' : 'text-gray-600'}`}>
          {description}
        </p>
      )}
    </div>
  );
};

export default Task;