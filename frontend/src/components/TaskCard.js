import React from "react";
import { useRouter } from "next/navigation";  // Import useRouter for navigation
import { deleteTask } from "@/service/taskservice"; // Import the deleteTask function

const TaskCard = ({ task, onEdit, onDelete }) => {
  const router = useRouter(); // Initialize router

  const handleDelete = async (event) => {
    try {
      event.stopPropagation();  // Prevent triggering the card click event when deleting
      console.log("onDelete", task);
      // Call the deleteTask function and pass the task id
      await deleteTask(task._id);
      // Notify the parent component about the deletion
      if (onDelete) onDelete(task._id);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleCardClick = () => {
    // Navigate to the task details page when the card is clicked
    router.push(`/main/tasks/${task._id}`);
  };

  const formatDate = (date) => {
    if (date) {
      // Format the date as 'dd/mm/yyyy'
      const formattedDate = new Date(date).toLocaleDateString('en-GB'); // 'en-GB' gives dd/mm/yyyy format
      return formattedDate;
    }
    return null;
  };

  return (
    <div className="card mb-3" onClick={handleCardClick}>  {/* Handle card click for navigation */}
      <div className="card-body">
        <h5 className="card-title">{task.title}</h5>
        <p className="card-text">{task.description}</p>
        <p className="card-text">
          <small className="text-muted">
            {/* Only show Due Date if available */}
            {task.dueDate && <>Due Date: {formatDate(task.dueDate)}</>}
          </small>
        </p>
        <span
          className={`badge bg-${
            task.priority === "High"
              ? "danger"
              : task.priority === "Medium"
              ? "warning"
              : "success"
          }`}
        >
          {task.priority}
        </span>

        {/* Delete Icon */}
        <button
          className="btn btn-sm btn-danger float-end ms-2"
          onClick={handleDelete} // Handle delete without refreshing
        >
          Delete
        </button>
        {/* The Edit button */}
        <button
          className="btn btn-sm btn-primary float-end"
          onClick={(e) => { 
            e.stopPropagation();  // Prevent card click navigation when editing
            onEdit(task);  // Trigger onEdit with the task to be edited
          }}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
