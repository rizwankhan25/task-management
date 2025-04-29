'use client';

import { useEffect, useState } from "react";
import { fetchUpcomingDeadlines } from "@/service/dashboardservice";

// helper function
const formatDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date)) return "Invalid Date"; // safeguard
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() is zero-indexed
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

const UpcomingDeadlines = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUpcomingDeadlines();
        // preprocess tasks: add formattedDeadline
        const updatedTasks = data.map(task => ({
          ...task,
          formattedDeadline: formatDate(task.dueDate || task.deadline), // use correct field
        }));
        setTasks(updatedTasks);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div className="alert alert-danger">Error: {error}</div>;
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Upcoming Deadlines</h3>
      {tasks.length === 0 ? (
        <p>No upcoming tasks!</p>
      ) : (
        <ul className="list-group">
          {tasks.map((task) => (
            <li key={task._id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{task.title}</strong><br />
                <small className="text-muted">Deadline: {task.formattedDeadline}</small>
              </div>
              <span className="badge bg-primary rounded-pill">
                {task.priority}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UpcomingDeadlines;
