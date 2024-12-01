import { useState, useEffect } from "react";
import Calendar from "react-calendar"; 
import "react-calendar/dist/Calendar.css"; 
import '../assets/css/Calender.css';
import Sidebar from "./Sidebar";
import axios from 'axios';

const CalendarPage = () => {
  const [date, setDate] = useState(new Date()); 
  const [tasks, setTasks] = useState([]); 
  const [scheduledTasks, setScheduledTasks] = useState([]); 

  // Fetch tasks from the backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/tasks'); // Update with your backend API
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } 
    };

    fetchTasks();
  }, []);

  const handleDateChange = (newDate) => {
    setDate(newDate);
    const selectedDateString = newDate.toISOString().split("T")[0]; 

    console.log("Selected Date:", selectedDateString); 

    // Filter tasks based on the selected date
    const tasksForDate = tasks.filter(task => {
      const taskDateString = new Date(task.date).toISOString().split("T")[0]; 
      console.log("Task Date:", taskDateString); 
      return taskDateString === selectedDateString; 
    });

    console.log("Filtered Tasks:", tasksForDate); 

    setScheduledTasks(tasksForDate);
  };

  const getTaskStatusStyle = (status) => {
    // Style for completed vs. pending tasks
    return status === "completed" ? { backgroundColor: "#28a745", color: "white" } : { backgroundColor: "#dc3545", color: "white" };
  };

  const tileDisabled = ({ date }) => {
    // Disable dates before today if desired
    return date < new Date(new Date().setHours(0, 0, 0, 0)); // Optionally, disable past dates
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="calendar-content">
        <h1>Calendar</h1>
        <div className="calendar-and-tasks">
          <div className="calendar-container">
            <Calendar
              onChange={handleDateChange}
              value={date}
              tileDisabled={tileDisabled}
              onClickDay={handleDateChange}
              className="custom-calendar"
            />
          </div>
          <div className="tasks-list">
            <h2>Tasks for {date.toLocaleDateString()}</h2>
            {scheduledTasks.length > 0 ? (
              <ul>
                {scheduledTasks.map((task, index) => (
                  <li key={index} style={getTaskStatusStyle(task.status)}>
                    {index + 1}) {task.text} 
                    <span className="task-status">{task.status}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No tasks scheduled for this date.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
