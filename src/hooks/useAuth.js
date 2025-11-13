// src/hooks/useAuth.js

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AuthService from "../services/AuthService"; 

export default function useAuth() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Função para lidar com o login do utilizador
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const data = await AuthService.login(user, password);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("isadmin", data.user.isadmin);

      
      toast.success("Login realizado com sucesso!");
      navigate("/stock-control/dashboard");
    } catch (err) {
      setError("Credencias Inválidas");
      toast.error("Erro ao fazer login!");
    } finally {
      setIsLoading(false);
    }
  };

  // Função para lidar com o logout do utilizador
  const logout = async () => {
    setIsLoading(true);
    try {
      await AuthService.logout();
    } catch (error) {
      console.error("Erro ao chamar API de logout:", error);
    } finally {
      localStorage.clear();
      toast.success("Logout realizado com sucesso!");
      navigate("/");
      setIsLoading(false);
    }
  };

  return {
    user,
    setUser,
    password,
    setPassword,
    handleLogin,
    error,
    isLoading,
    logout,
  };
}