// lib/authenticate.js
export function setToken(token) {
    if (typeof window !== 'undefined') {
      localStorage.setItem("jwt_token", token);
    }
  }
  
  export function getToken() {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem("jwt_token");
  }
  
  export function removeToken() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem("jwt_token");
    }
  }
  
  export function readToken() {
    const token = getToken();
    if (!token) return null;
    // Optionally, decode the token if you need to read its payload.
    // You can use a library like jwt-decode if required.
    return token;
  }
  
  export function isAuthenticated() {
    return !!getToken();
  }
  
  // Function to login a user (this sends a POST request to your User API login endpoint)
  export async function authenticateUser(userName, password) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName, password })
      });
      if (!res.ok) throw new Error('Login failed');
      const data = await res.json();
      if (data.token) {
        setToken(data.token);
        return data;
      }
      throw new Error('No token received');
    } catch (error) {
      throw error;
    }
  }
  
  // Function to register a user (note: this does not automatically log the user in)
  export async function registerUser(userName, password, password2) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName, password, password2 })
      });
      if (!res.ok) throw new Error('Registration failed');
      const data = await res.json();
      return data.message;
    } catch (error) {
      throw error;
    }
  }
  