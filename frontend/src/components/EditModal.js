'use client';

import React, { useState, useEffect } from 'react';

const EditModal = ({ show, onClose, task, onSave }) => {
  
  const [updatedTask, setUpdatedTask] = useState({
    _id: task?._id || '',
    title: task?.title || '',
    description: task?.description || '',
    dueDate: task?.dueDate || '',
    priority: task?.priority || 'Medium',
    completed: task?.completed ? 'Completed' : 'Pending', // Assuming status is a new field
  });

  useEffect(() => {
    if (task) {
      setUpdatedTask({
        _id: task._id,
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        priority: task.priority,
        completed: task.completed ? 'Completed' : 'Pending',
      });
      console.log('Updated Task: ', task)
    }
  }, [task]);

  const handleInputChange = (e) => {
    setUpdatedTask({
      ...updatedTask,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    console.log('Updated Task 1: ', updatedTask )
    updatedTask.completed = updatedTask.completed == 'Completed'
    console.log('Updated Task 2: ', updatedTask)
    onSave(updatedTask); // Pass the updated task to the parent component
  };

  return (
    show && (
      <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Task</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>

            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={updatedTask.title}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  value={updatedTask.description}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label">Due Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="dueDate"
                  value={updatedTask.dueDate}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Priority</label>
                <select
                  className="form-select"
                  name="priority"
                  value={updatedTask.priority}
                  onChange={handleInputChange}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  name="completed"
                  value={updatedTask.completed}
                  onChange={handleInputChange}
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleSave}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default EditModal;
