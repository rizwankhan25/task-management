// components/AuthForm.js
"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login, signup } from '../service/authservice';

export default function AuthForm({ type }) {
  const [isLogin, setIsLogin] = useState(type === 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (type === 'login') {
        await login({ email, password });
        router.push('/main/dashboard');
      } else {
        await signup({ email, password });
        router.push('/login');
      }
    } catch (error) {
      console.error(error);
      // Handle error (e.g., show error message)
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    router.push(isLogin ? '/signup' : '/login');
  };
  

  return (
    <form onSubmit={handleSubmit} className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4 text-center">{type === 'login' ? 'Login' : 'Sign Up'}</h2>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">
        {type === 'login' ? 'Login' : 'Sign Up'}
      </button>
      <button className="btn btn-link w-100" onClick={toggleForm}>
        {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
      </button>
    </form>
  );
}
