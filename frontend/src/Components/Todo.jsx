import { useState } from "react";
import Sidebar from "./Sidebar";
import '../assets/css/Todo.css';

const SliderIcon = ({ onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="24"
    height="24"
    onClick={onClick}
    style={{ cursor: "pointer" }}
  >
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="18" x2="20" y2="18" />
    <circle cx="8" cy="6" r="2" />
    <circle cx="16" cy="12" r="2" />
    <circle cx="12" cy="18" r="2" />
  </svg>
);

const DeleteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="16"
    height="16"
    style={{ cursor: "pointer" }}
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [filter, setFilter] = useState("all");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleInputChange = (e) => {
    setTaskInput(e.target.value);
  };

  const handleAddTask = () => {
    if (taskInput.trim()) {
      setTasks([...tasks, { text: taskInput, completed: false }]);
      setTaskInput(""); // Clear input field
    } else {
      alert("You didn't give the task! Please enter a task.");
    }
  };

  const handleToggleTask = (index) => {
    const newTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setIsDropdownVisible(false);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div className="todo-page">
      <Sidebar />
      <div className="todo-content">
        <h1 className="todo-title">To-do List</h1>

        <div className="add-task">
          <input
            type="text"
            placeholder="Add a new task..."
            value={taskInput}
            onChange={handleInputChange}
          />
          <button onClick={handleAddTask}>Add Task</button>

          <div className="filter-tasks">
            <SliderIcon onClick={() => setIsDropdownVisible(!isDropdownVisible)} />
            {isDropdownVisible && (
              <div className="dropdown">
                <ul>
                  <li onClick={() => handleFilterChange("all")}>All</li>
                  <li onClick={() => handleFilterChange("completed")}>Completed</li>
                  <li onClick={() => handleFilterChange("pending")}>Pending</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <ul className="task-list">
          {filteredTasks.map((task, index) => (
            <li key={index} className={task.completed ? "completed" : ""}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleTask(index)}
              />
              <span>{task.text}</span>
              <div onClick={() => handleDeleteTask(index)}>
                <DeleteIcon />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ToDoList;
