import TaskItem from "./TaskItem";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const TaskList = ({ tasks, toggleComplete, deleteTask, setTasks,updateTask }) => {
  const moveTask = (fromIndex, toIndex) => {
    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(fromIndex, 1);
    updatedTasks.splice(toIndex, 0, movedTask);
    setTasks(updatedTasks);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <TaskItem
            key={task.id}
            index={index}
            task={task}
            toggleComplete={toggleComplete}
            deleteTask={deleteTask}
            moveTask={moveTask}
            updateTask={updateTask}
          />
        ))}
      </ul>
    </DndProvider>
  );
};

export default TaskList;
