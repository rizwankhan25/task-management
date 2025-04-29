export const login = async (credentials) => {
    const response = await fetch('http://localhost:5000/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
  
    if (!response.ok) {
      throw new Error('Login failed');
    }
    const json = await response.json();
    const token = json['token']
    localStorage.setItem('token', token)
    return json;
  };
  
  export const signup = async (credentials) => {
    const response = await fetch('http://localhost:5000/api/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
  
    if (!response.ok) {
      throw new Error('Signup failed');
    }
  
    return response.json();
  };