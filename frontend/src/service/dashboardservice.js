export const fetchPriorityDistribution = async () => {
    const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:5000/api/tasks/priority-distribution", {
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
}

export const fetchCompletionRate = async () => {
    const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:5000/api/tasks/completion-over-time", {
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
}

// upcoming dead line
const now = new Date();
const month = now.getMonth() + 1; // January is 0
const year = now.getFullYear(); 

export const fetchUpcomingDeadlines = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:5000/api/tasks/by-month?month=${month}&year=${year}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
         Authorization: "Bearer " + token,
      },
    });
  
    if (!response.ok) {
      throw new Error("Failed to fetch upcoming deadlines");
    }
  
    return response.json();
  };
  