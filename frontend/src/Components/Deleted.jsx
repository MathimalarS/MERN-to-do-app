import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { FaUndo } from "react-icons/fa";
import axios from "axios";
import "../assets/css/Deleted.css";

const Deleted = () => {
  const [deletedTasks, setDeletedTasks] = useState([]);

  useEffect(() => {
    const fetchDeletedTasks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/deletedTasks"
        );
        console.log("Fetched deleted tasks:", response.data);
        setDeletedTasks(response.data);
      } catch (error) {
        console.error("Error fetching deleted tasks:", error);
      }
    };

    fetchDeletedTasks();
  }, []);

  const restoreTask = async (taskId) => {
    try {
      if (!taskId) {
        console.error("No task ID provided");
        return;
      }

      console.log("Restoring task with ID:", taskId);
      const response = await axios.post(
        `http://localhost:5000/api/deletedTasks/restore/${taskId}`
      );

      console.log("Task restored:", response.data);

      setDeletedTasks((prevTasks) =>
        prevTasks.filter((task) => task._id !== taskId)
      );
    } catch (error) {
      console.error("Error restoring task:", error);
    }
  };

  return (
    <div className="main">
      <Sidebar />
      <div className="deleted-page">
        <h1>Deleted Tasks</h1>
        <p>View your deleted tasks.</p>
        <div className="deleted-tasks-list">
          {deletedTasks.length > 0 ? (
            <ul>
              {deletedTasks.map((task, index) => (
                <li key={index} className="deleted-task-item">
                  {task.text}
                  <FaUndo
                    onClick={() => restoreTask(task._id)}
                    className="restore-icon"
                    title="Restore Task"
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p className="no">No deleted tasks to show.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Deleted;
