import { useDrop } from "react-dnd";
import Task from "./Task";

const Category = ({
  id,
  title,
  tasks,
  onTaskDrop,
  onEditTask,
  onDeleteTask,
  onToggleComplete,
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TASK",
    drop: (item) => {
      console.log("Category receiving drop:", { categoryId: id, task: item });
      onTaskDrop(item, id);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`p-4 bg-gray-50 rounded-lg ${isOver ? "bg-blue-50" : ""}`}
    >
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="space-y-2">
        {tasks &&
          tasks.map((task) => (
            <Task
              key={task.id}
              {...task}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
              onToggleComplete={onToggleComplete}
            />
          ))}
      </div>
    </div>
  );
};

export default Category;
