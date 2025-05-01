// src/modules/Auth/services/authService.js
import { jwtDecode } from "jwt-decode";

const API_URL = import.meta.env.VITE_API_URL
const TOKEN_KEY = "jwt_token";

export const authService = {

  async login({ email, password }) {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      throw new Error("Credenciales inválidas");
    }

    const token = await res.text();
    const user = jwtDecode(token);
    localStorage.setItem(TOKEN_KEY, token);
    return user;
  },

  async register(data) {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(await res.text());
    }

    return await res.text();
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  getCurrentUser() {
    try {
      const token = authService.getToken();
      if (!token) return null;
      const user = jwtDecode(token);

      if (Date.now() >= user.exp * 1000) {
        authService.logout();
        return null;
      }

      return user;
    } catch {
      return null;
    }
  },
};