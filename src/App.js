import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import DarkModeToggle from "./components/DarkModeToggle";
import "./styles/global.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = (title, priority, dueDate) => {
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
      priority,
      dueDate,
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id, updatedTask) => {
    setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "dueDate") {
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    if (sortBy === "priority") {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return 0;
  });

  return (
    <div className="container">
      <div className="tithead">
        <h1>Krish's Task Management APP</h1>
        <DarkModeToggle />
      </div>

      <div className="two-columns">
        <div className="left-column">
          <div className="filter-sort">
            <select onChange={(e) => setFilter(e.target.value)} value={filter}>
              <option value="all">All Tasks</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>

            <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
              <option value="default">Sort By</option>
              <option value="dueDate">Due Date</option>
              <option value="priority">Priority</option>
            </select>
          </div>

          <div className="task-list-container">
            <TaskList
              tasks={sortedTasks}
              setTasks={setTasks}
              toggleComplete={toggleComplete}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          </div>
        </div>

        <div className="right-column">
          <h3>Add New Task</h3>
          <TaskForm addTask={addTask} />
        </div>
      </div>

      <footer className="footer">
        <p>© 2025 Developed by Krishna K</p>
        <p>Contact: Krish1826s@gmail.com | 8667815090</p>
      </footer>
    </div>
  );
};

export default App;
