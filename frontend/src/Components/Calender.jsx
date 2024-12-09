import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../assets/css/Calender.css";
import Sidebar from "./Sidebar";
import axios from "axios";

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [scheduledTasks, setScheduledTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  const handleDateChange = (newDate) => {
    setDate(newDate);
    const selectedDateString = newDate.toISOString().split("T")[0];

    const tasksForDate = tasks.filter((task) => {
      const taskDateString = new Date(task.date).toISOString().split("T")[0];
      return taskDateString === selectedDateString && !task.completed;
    });

    setScheduledTasks(tasksForDate || []);
  };

  const getTileContent = ({ date, view }) => {
    if (view === "month") {
      const dateString = date.toISOString().split("T")[0];
      const tasksForDate = tasks.filter(
        (task) =>
          new Date(task.date).toISOString().split("T")[0] === dateString &&
          !task.completed
      );

      if (tasksForDate.length > 0) {
        return <div className="task-dot"></div>;
      }
    }
    return null;
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
              tileDisabled={() => false}
              tileContent={getTileContent}
              className="custom-calendar"
            />
          </div>
          <div className="tasks-list">
            <h2>Tasks for {date.toLocaleDateString()}</h2>
            {scheduledTasks.length > 0 ? (
              <ul>
                {scheduledTasks.map((task, index) => (
                  <li key={index} className={`task-item ${task.status}`}>
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
