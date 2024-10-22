import { useState, useEffect } from "react";
import Calendar from "react-calendar"; // Import the calendar component
import "react-calendar/dist/Calendar.css"; // Import calendar styles
import '../assets/css/Calender.css'; // Make sure to style accordingly
import Sidebar from "./Sidebar";
import axios from 'axios';

const CalendarPage = () => {
  const [date, setDate] = useState(new Date()); // Initialize with the current date
  const [tasks, setTasks] = useState([]); // State to store tasks
  const [scheduledTasks, setScheduledTasks] = useState([]); // State for tasks on selected date

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

  const tileDisabled = ({ date }) => {
    // Disable dates before today
    return date < new Date();
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
    const selectedDateString = newDate.toISOString().split("T")[0]; // Get date in 'YYYY-MM-DD' format

    // Filter tasks based on the selected date
    const tasksForDate = tasks.filter(task => {
      const taskDateString = new Date(task.date).toISOString().split("T")[0]; // Convert task date to 'YYYY-MM-DD'
      return taskDateString === selectedDateString; // Compare dates
    });

    setScheduledTasks(tasksForDate);
  };

  return (
    <div className="calendar-page">
      <Sidebar />
      <div className="calendar-content">
        <h1>Calendar</h1>
        <div className="calendar-container">
          <Calendar
            onChange={handleDateChange}
            value={date}
            tileDisabled={tileDisabled} // Disable past dates
            onClickDay={handleDateChange} // Trigger on date click
            className="custom-calendar" // Add custom class for styling
          />
        </div>
        <div className="tasks-list">
  <h2>Tasks for {date.toLocaleDateString()}</h2>
  {scheduledTasks.length > 0 ? (
    <ul>
      {scheduledTasks.map((task, index) => (
        <li key={index}>
          {index + 1}) {task.text} {/* Make sure this matches your task object's property */}
        </li>
      ))}
    </ul>
  ) : (
    <p>No tasks scheduled for this date.</p>
  )}
</div>

      </div>
    </div>
  );
};

export default CalendarPage;
