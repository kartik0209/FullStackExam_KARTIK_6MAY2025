// lib/api.ts
export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://fullstackexam-kartik-chaudhary-6may2025.onrender.com/api";

export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return res.json();
};

export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return res.json();
};
