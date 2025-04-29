"use client"
import { useEffect, useState } from "react";
import { fetchTasks } from "@/service/taskservice";
import TaskCard from "@/components/TaskCard";
import { createTask, editTask, searchTasks } from "@/service/taskservice";
import EditModal from "@/components/EditModal";

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium",
  });
  const [taskToEdit, setTaskToEdit] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  // Trigger search when the search query or priority filter changes
  useEffect(() => {
    if (searchQuery || priorityFilter) {
      handleSearch(searchQuery); // Trigger search on query or filter change
    } else {
      loadTasks(); // Load all tasks if search or filter is empty
    }
  }, [searchQuery, priorityFilter]); // Dependencies to trigger on either searchQuery or priorityFilter change

  const loadTasks = async () => {
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
    // this is main page 
  // Update tasks based on search query and priority filter
  const handleSearch = async (searchQuery) => {
    try {
      const data = await searchTasks(searchQuery, priorityFilter); // Pass both search query and priority filter
      setTasks(data); // Update tasks with the filtered results
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCreateTask = () => {
    setShowCreateModal(true);
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setNewTask({ title: "", description: "", dueDate: "", priority: "Medium" });
  };

  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // This will trigger the useEffect above to call handleSearch
  };

  const handlePriorityFilterChange = (e) => {
    setPriorityFilter(e.target.value); // Trigger search whenever priority filter is updated
  };

  const handleSaveTask = async () => {
    try {
      const savedTask = await createTask(newTask);
      setTasks([...tasks, savedTask.task]); // Add new task to the list
      handleCloseModal();
    } catch (err) {
      setError('Failed to save task: ' + err.message);
    }
  };

  const handleEdit = (task) => {
    setTaskToEdit(task);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setTaskToEdit(null);
  };

  const handleEditSaveTask = async (updatedTask) => {
    try {
      const updated = await editTask(updatedTask._id, updatedTask);
      loadTasks(); // Reload tasks after update
      handleCloseEditModal();
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const handleDelete = (deletedTaskId) => {
    // Update the state to remove the deleted task
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== deletedTaskId));
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Tasks</h1>
      <button className="btn btn-primary mb-3" onClick={handleCreateTask}>
        Create New Task
      </button>

      <div className="row mb-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={handleSearchChange} // This will update the searchQuery state
          />
        </div>
        <div className="col-md-6">
          <select
            className="form-select"
            value={priorityFilter}
            onChange={handlePriorityFilterChange}
          >
            <option value="">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p>Loading tasks...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : tasks.length === 0 ? (
        <p>No tasks available. Please create a new task.</p>
      ) : (
        <div className="row">
          {tasks.map((task) => (
            <div className="col-md-4" key={task._id}>
              <TaskCard task={task} onEdit={handleEdit} onDelete={handleDelete} />
            </div>
          ))}
        </div>
      )}

      {/* Modal for creating a new task */}
      {showCreateModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create New Task</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={newTask.title}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={newTask.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label">Due Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="dueDate"
                    value={newTask.dueDate}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Priority</label>
                  <select
                    className="form-select"
                    name="priority"
                    value={newTask.priority}
                    onChange={handleInputChange}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSaveTask}
                >
                  Save Task
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Task Modal */}
      <EditModal
        show={showEditModal}
        onClose={handleCloseEditModal}
        task={taskToEdit}
        onSave={handleEditSaveTask}
      />
    </div>
  );
};

export default TasksPage;
