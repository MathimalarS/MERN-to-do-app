import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import '../assets/css/Todo.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

const EditIcon = ({ onClick }) => (
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
    onClick={onClick}
    style={{ cursor: "pointer", marginRight: "10px" }}
  >
    <path d="M12 20h9" />
    <path d="M16.5 3.5l4 4L7 21H3v-4L16.5 3.5z" />
  </svg>
);

const DeleteIcon = ({ onClick }) => (
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
    onClick={onClick}
    style={{ cursor: "pointer" }}
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);


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

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [taskDate, setTaskDate] = useState(null);
  const [isEditing, setIsEditing] = useState(null);
  const [editedTaskName, setEditedTaskName] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [currentFilter, setCurrentFilter] = useState("All"); // State to track the selected filter

  // Fetch tasks from the backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (taskInput.trim()) {
      try {
        const newTask = { text: taskInput, completed: false, date: taskDate };
        const response = await axios.post('http://localhost:3000/api/tasks', newTask);
        setTasks([...tasks, response.data]);
        setTaskInput("");
        setTaskDate(null);
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  const handleToggleTask = async (index) => {
    const task = tasks[index];
    try {
      const updatedTask = { ...task, completed: !task.completed };
      const taskId = task._id || task.id;
      await axios.put(`http://localhost:3000/api/tasks/${taskId}`, updatedTask);
      const newTasks = tasks.map((t, i) => (i === index ? updatedTask : t));
      setTasks(newTasks);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (index) => {
    const task = tasks[index];
    try {
      const taskId = task._id || task.id;
      await axios.delete(`http://localhost:3000/api/tasks/${taskId}`);
      const newTasks = tasks.filter((_, i) => i !== index);
      setTasks(newTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEditTask = (index) => {
    setIsEditing(index);
    setEditedTaskName(tasks[index].text);
  };

  const handleSaveTask = async (index) => {
    const task = tasks[index];
    try {
      const updatedTask = { ...task, text: editedTaskName };
      const taskId = task._id || task.id;
      await axios.put(`http://localhost:3000/api/tasks/${taskId}`, updatedTask);
      const newTasks = tasks.map((t, i) => (i === index ? updatedTask : t));
      setTasks(newTasks);
      setIsEditing(null);
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(null);
    setEditedTaskName("");
  };

  const handleFilterToggle = () => {
    setShowFilter(!showFilter);
  };

  const handleFilterChange = (filter) => {
    setCurrentFilter(filter);
    setShowFilter(false); // Close the dropdown after selecting a filter
  };

  // Filter the tasks based on the current filter
  const filteredTasks = tasks.filter((task) => {
    if (currentFilter === "All") return true;
    if (currentFilter === "Completed") return task.completed;
    if (currentFilter === "Pending") return !task.completed;
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
            onChange={(e) => setTaskInput(e.target.value)}
          />
          <DatePicker
            selected={taskDate}
            onChange={(date) => setTaskDate(date)}
            minDate={new Date()}  // Prevent selecting past dates
            placeholderText="Select a date"
            className="date-picker"
          />
          <button onClick={handleAddTask}>Add Task</button>

          <div className="filter-tasks">
            <SliderIcon onClick={handleFilterToggle} />
            {showFilter && (
              <div className="dropdown">
                <ul>
                  <li onClick={() => handleFilterChange("All")}>All Tasks</li>
                  <li onClick={() => handleFilterChange("Completed")}>Completed Tasks</li>
                  <li onClick={() => handleFilterChange("Pending")}>Pending Tasks</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <ul className="task-list">
          {filteredTasks.map((task, index) => (
            <li key={task._id || task.id || index} className={task.completed ? "completed" : ""}>
              {isEditing === index ? (
                <>
                  <input
                    type="text"
                    value={editedTaskName}
                    onChange={(e) => setEditedTaskName(e.target.value)}
                  />
                  <button onClick={() => handleSaveTask(index)}>Save</button>
                  <button onClick={handleCancelEdit}>Cancel</button>
                </>
              ) : (
                <>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleTask(index)}
                  />
                  <span>{task.text}</span>
                  <div className="task-actions">
                    <EditIcon onClick={() => handleEditTask(index)} />
                    <DeleteIcon onClick={() => handleDeleteTask(index)} />
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ToDoList;
