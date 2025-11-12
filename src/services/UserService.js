import myAxios from "../api/axiosInstance";

// Helper para obter o token
const getToken = () => localStorage.getItem("token");

// Helper para headers de autenticação (usado para GET, DELETE)
const getAuthHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
  Accept: "application/json",
});

// Helper para headers que também enviam dados JSON (usado for POST, PUT)
const getAuthHeadersWithContent = () => ({
  Authorization: `Bearer ${getToken()}`,
  Accept: "application/json",
  "Content-Type": "application/json",
});

const UserService = {
    
  // Função para buscar todos os utilizadores (paginado)
  getAll: async (page = 1, limit = 10) => {
    const response = await myAxios.get("/user", {
      headers: getAuthHeaders(), 
      params: { page, limit },
    });
    return response.data.data;
  },

  // Função para remover um utilizador
  remove: async (id) => {
    const response = await myAxios.delete(`/user/${id}`, {
      headers: getAuthHeaders(), 
    });
    return response.data;
  },

  // Função para atualizar os dados de um utilizador
  updateUser: async (id, { name, number_registration }) => {
    const dataToSend = { name, number_registration };
    
    const response = await myAxios.put(`/user/${id}`, dataToSend, {
      headers: getAuthHeadersWithContent(), 
    });
    return response.data.user ?? response.data;
  },

  // Função para atualizar a password de um utilizador
  updatePassword: async (id, data) => {
    const response = await myAxios.put(`/password/${id}`, data, {
      headers: getAuthHeadersWithContent(), 
    });
    return response.data;
  },

  // Função para criar um novo utilizador
  createUser: async (data) => {
    const response = await myAxios.post("user/store", data, {
      headers: getAuthHeadersWithContent(), 
    });
    return response.data;
  },
};

export default UserService;