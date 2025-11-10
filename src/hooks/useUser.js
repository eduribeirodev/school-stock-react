
import { useState, useEffect } from "react";
import { toast } from "sonner";
import UserService from "../services/UserService";

export default function useUsers(currentPage = 1, pageSize = 10) {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
    
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsersCount, setTotalUsersCount] = useState(0); 

  const getAllUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await UserService.getAll(currentPage, pageSize);
        
        if (response) { 
            setUsers(response.data || []); 
            setTotalUsersCount(response.total || 0); 
            setTotalPages(response.last_page || 1); 
        } else {
            setUsers([]);
            setTotalUsersCount(0);
            setTotalPages(1);
        }

    } catch (err) {
      console.error("Erro ao buscar usuários:", err);
      setError("Erro ao carregar usuários.");
      toast.error("Erro ao carregar usuários!");
    } finally {
      setIsLoading(false);
    }
  };


  const deleteUser = async (id) => {
    try {
      await UserService.remove(id);
      toast.success("Usuário excluído com sucesso!");
      await getAllUsers();
    } catch (err) {
      console.error("Erro ao excluir usuário:", err);
      toast.error("Erro ao excluir usuário!");
    }
  };

  const updateUser = async (id, data) => {
    try {
      const updatedUser = await UserService.updateUser(id, data);
      setUsers((prev) =>
        prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
      );
      return updatedUser;
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      toast.error("Erro ao atualizar usuário!");
      throw error;
    }
  };

 const newPassword = async (id, data) => {
    try {
      const response = await UserService.updatePassword(id, data);
      toast.success("Senha atualizada com sucesso!"); 
      return response;
    } catch (error) {
      console.error("Erro ao atualizar senha:", error); 
      toast.error("Erro ao atualizar senha!");
      throw error;
    }
  };

 const newUser = async (data) => {
  try {
    const response = await UserService.createUser(data);
    toast.success("Usuário criado com sucesso!");
    await getAllUsers(); 
    return response;
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    toast.error("Erro ao criar usuário!");
    throw error;
  }
};


  useEffect(() => {
    getAllUsers();
  }, [currentPage, pageSize]); 

  return {
    users,
    isLoading,
    error,
    totalPages, 
    totalUsersCount, 
    
    getAllUsers,
    deleteUser,
    updateUser,
    newPassword, 
    newUser,
  };
}