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

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(false);

    try {
      const data = await AuthService.login(user, password);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("isadmin", data.user.isadmin); 

      toast.success("Login realizado com sucesso!");
      navigate("/stock-control/dashboard");
    } catch (err) {
      setError(true);
      toast.error("Erro ao fazer login!");
    } finally {
      setIsLoading(false);
    }
  };

  // LOGOUT
  const logout = async () => {
    try {
      await AuthService.logout();
      toast.success("Logout realizado com sucesso!");
    } catch (error) {
      console.error("Erro ao deslogar:", error);
      toast.error("Erro ao deslogar!");
    } finally {
      localStorage.clear();
      navigate("/");
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
