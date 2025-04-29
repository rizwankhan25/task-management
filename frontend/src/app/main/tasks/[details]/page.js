"use client";

import { useState, useEffect } from "react";
import { getTaskDetails } from "@/service/taskservice"; // ✅ Corrected import

export default function TaskDetailsPage({ params }) {
  const { details } = params; // 'details' = taskId from URL

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!details) return;

    const fetchData = async () => {
      try {
        const data = await getTaskDetails(details); // ✅ Correct function call
        setTask(data);
      } catch (err) {
        console.error("Error fetching task details:", err); // Log error
        setError("Failed to load task details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [details]);

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error) return <p className="text-danger text-center mt-5">{error}</p>;
  if (!task) return <p className="text-center mt-5">No task found</p>;

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h2>Task Details</h2>
        </div>
        <div className="card-body">
          <h3 className="card-title">{task.title}</h3>
          <p className="card-text">{task.description}</p>
          <p className="card-text">
            <strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString('en-GB')}
          </p>
          <p className="card-text">
            <strong>Priority:</strong> 
            <span className={`badge ms-2 ${
              task.priority === "High" ? "bg-danger" :
              task.priority === "Medium" ? "bg-warning" :
              "bg-success"
            }`}>
              {task.priority}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
