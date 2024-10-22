import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import '../assets/css/Todo.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Datepicker styles
import { addDays } from 'date-fns';
import axios from 'axios';

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

const CalendarIcon = ({ onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="24"
    height="24"
    onClick={onClick}
    style={{ cursor: "pointer", color: "black" }}
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
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
  const [taskDate, setTaskDate] = useState(null);
  const [filter, setFilter] = useState("all");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  // Fetch tasks from the backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/tasks'); // Update the endpoint
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleInputChange = (e) => {
    setTaskInput(e.target.value);
  };

  const handleAddTask = async () => {
    if (taskInput.trim() && taskDate) {
      try {
        const newTask = { text: taskInput, completed: false, date: taskDate };
        const response = await axios.post('http://localhost:3000/api/tasks', newTask); // Update with your backend API
        setTasks([...tasks, response.data]);
        setTaskInput(""); // Clear input field
        setTaskDate(null); // Clear selected date
      } catch (error) {
        console.error('Error adding task:', error);
      }
    } else {
      alert("Please enter a task and select a valid date.");
    }
  };

  const handleToggleTask = async (index) => {
    const task = tasks[index];
    if (!task.id && !task._id) {
      console.error("Task ID is missing");
      return;
    }
    
    try {
      const updatedTask = { ...task, completed: !task.completed };
      const taskId = task._id || task.id; // Handle MongoDB _id or generic id
      await axios.put(`http://localhost:3000/api/tasks/${taskId}`, updatedTask); // Update task completion
      const newTasks = tasks.map((t, i) => (i === index ? updatedTask : t));
      setTasks(newTasks);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (index) => {
    const task = tasks[index];
    if (!task.id && !task._id) {
      console.error("Task ID is missing");
      return;
    }

    try {
      const taskId = task._id || task.id;
      await axios.delete(`http://localhost:3000/api/tasks/${taskId}`); // Delete the task
      const newTasks = tasks.filter((_, i) => i !== index);
      setTasks(newTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
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

  const handleDateChange = (date) => {
    setTaskDate(date);
    setIsCalendarVisible(false);
  };

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

          <CalendarIcon onClick={() => setIsCalendarVisible(!isCalendarVisible)} />

          {isCalendarVisible && (
            <div className="calendar-dropdown">
              <DatePicker
                selected={taskDate}
                onChange={handleDateChange}
                minDate={new Date()} // Disable past dates
                placeholderText="Select a date"
                dateFormat="yyyy-MM-dd"
                inline
              />
            </div>
          )}

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
            <li key={task._id || task.id || index} className={task.completed ? "completed" : ""}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleTask(index)}
              />
              <span>{task.text} (Due: {new Date(task.date).toLocaleDateString()})</span> {/* Display task date */}
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
