import { useState, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { FaTrash, FaEdit, FaSave } from "react-icons/fa";

const TaskItem = ({ task, toggleComplete, deleteTask, updateTask, index, moveTask }) => {
  const ref = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const [, drag] = useDrag({
    type: "TASK",
    item: { index },
  });

  const [, drop] = useDrop({
    accept: "TASK",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveTask(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  drag(drop(ref));

  const handleSave = () => {
    updateTask(task.id, editedTask);
    setIsEditing(false);
  };

  return (
    <li ref={ref} className={`task-item ${task.completed ? "completed" : ""}`}>
      {isEditing ? (
        <div className="edit-mode">
          <input
            type="text"
            value={editedTask.title}
            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
          />
          <select
            value={editedTask.priority}
            onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })}
          >
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
          <input
            type="date"
            value={editedTask.dueDate}
            onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
          />
          <button onClick={handleSave} className="save-btn">
            <FaSave />
          </button>
        </div>
      ) : (
        <div className="task-content">
          <div className="left-section">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
            />
            <div className="task-details">
              <h3 className="task-title">{task.title}</h3>
              <p className="task-meta">
                <span className={`priority ${task.priority.toLowerCase()}`}>
                  {task.priority}
                </span>
                <span className="due-date">Due: {task.dueDate || "No date"}</span>
              </p>
            </div>
          </div>
          <div className="buttons">
            <button onClick={() => setIsEditing(true)} className="edit-btn">
              <FaEdit />
            </button>
            <button className="delete-btn" onClick={() => deleteTask(task.id)}>
              <FaTrash />
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export default TaskItem;
