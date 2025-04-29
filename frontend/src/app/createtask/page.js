import React, { useState } from 'react';
import { createTask } from './taskService';  // Assuming you have this function in a separate file

const TaskForm = () => {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Medium', // Default priority
    completed: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createTask(taskData);
      console.log('Task created successfully:', response);
      // Handle success (e.g., show a success message or reset the form)
    } catch (error) {
      console.error('Error creating task:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Title:</label>
      <input
        type="text"
        name="title"
        value={taskData.title}
        onChange={handleChange}
        required
      />
      
      <label>Description:</label>
      <textarea
        name="description"
        value={taskData.description}
        onChange={handleChange}
      />

      <label>Due Date:</label>
      <input
        type="date"
        name="dueDate"
        value={taskData.dueDate}
        onChange={handleChange}
      />

      <label>Priority:</label>
      <select
        name="priority"
        value={taskData.priority}
        onChange={handleChange}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <button type="submit">Create Task</button>
    </form>
  );
};

export default TaskForm;
