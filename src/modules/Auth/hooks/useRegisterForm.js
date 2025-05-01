// src/modules/Auth/hooks/useRegisterForm.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/authContext';
import { authService } from '../services/authService';


const useRegisterForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    telefono: '',
    direccion: '',
    tipo: '', // COMPRADOR o VENDEDOR
    numeroCuenta: '', // Nuevo campo para BancoSimple
  });

  const navigate = useNavigate();
  const { login: setLoginState } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await authService.register(formData);
      await setLoginState({ email: formData.email, password: formData.password });
      navigate('/');
    } catch (err) {
      console.error('Error en el registro:', err.message || err);
      alert('Ocurrió un error al registrarte. Verifica tus datos.');
    }
  };

  return { formData, handleChange, handleSubmit };
};

export default useRegisterForm;
