// src/modules/Auth/hooks/useLoginForm.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authContext";

export default function useLoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(form);
      navigate("/"); // Redirige al Home
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    form,
    error,
    handleChange,
    handleSubmit,
  };
}