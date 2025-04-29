export const fetchTasks = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:5000/api/tasks", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return response.json()
};

// creatTask
export const createTask = async (taskData) => {
  const token = localStorage.getItem("token");
  
  const response = await fetch("http://localhost:5000/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(taskData), // Send the task data as the body
  });

  if (!response.ok) {
    throw new Error("Failed to create task");
  }

  return response.json(); // Return the created task or some response
};

// delete task
export const deleteTask = async (taskId) => {
    const token = localStorage.getItem("token");
  
    const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,  // Assuming authentication is required
      },
    });
  
    if (!response.ok) {
      throw new Error("Failed to delete task");
    }
  
    return response.json(); // Return the response after deleting the task
  };
  
// edit task

// editTask API handler
export const editTask = async (taskId, taskData) => {
    const token = localStorage.getItem("token");
  
    const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,  // Assuming authentication is required
      },
      body: JSON.stringify(taskData), // Send the updated task data as the body
    });
  
    if (!response.ok) {
      throw new Error("Failed to update task");
    }
  
    return response.json(); // Return the updated task or some response
  };
  
//   search 

export const searchTasks = async (search = "", priority = "") => {
    const token = localStorage.getItem("token");
  
    let url = "http://localhost:5000/api/tasks";
  
    // Create URLSearchParams only when there is something to add to the query string
    const params = new URLSearchParams();
  
    if (search) {
      params.append('search', search); // Append search query
    }
  
    if (priority) {
      params.append('priority', priority); // Append priority filter
    }
  
    // Append query parameters if there are any
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
  
    console.log("Search URL:", url); // Log the URL to check it
  
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
  
    if (!response.ok) {
      throw new Error("Failed to search tasks");
    }
  
    return response.json();
  };
  
  //details page
 export const getTaskDetails = async (taskId) => {
  const token = localStorage.getItem("token");
  const url = `http://localhost:5000/api/tasks/${taskId}`;  // Ensure this matches your backend route

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch task details");
  }

  return response.json();
};
