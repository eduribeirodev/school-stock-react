import myAxios from "../api/axiosInstance";

// Helper para obter o token
const getToken = () => localStorage.getItem("token");

// Helper para headers de autenticação (usado para GET, DELETE)
const getAuthHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
  Accept: "application/json",
});

// Helper para headers que também enviam dados (usado para POST, PUT)
const getAuthHeadersWithContent = () => ({
  Authorization: `Bearer ${getToken()}`,
  Accept: "application/json",
  "Content-Type": "application/json",
});

const CategoryService = {
    
  // Função para buscar todas as categorias
  getAll: async () => {
    const response = await myAxios.get("/category", {
      headers: getAuthHeaders(),
    });
    return response.data.data;
  },

  // Função para criar uma nova categoria
  create: async (data) => {
    const response = await myAxios.post("/category/store", data, {
      headers: getAuthHeadersWithContent(), 
    });
    return response.data;
  },

  // Função para remover uma categoria
  remove: async (id) => {
    const response = await myAxios.delete(`/category/${id}`, {
      headers: getAuthHeaders(), 
    });
    return response.data;
  },

  // Função para atualizar uma categoria
  update: async (id, { name, color }) => {
    const dataToSend = {
      name,
      color,
      _method: "PUT", 
    };

    const response = await myAxios.post(`/category/${id}`, dataToSend, {
      headers: getAuthHeadersWithContent(),
    });

    return response.data.data;
  },

 // Função para buscar a categoria pelo id 
  show: async (id) => {
    const response = await myAxios.get(`/category/${id}`, {
      headers: getAuthHeaders(), 
    });
    return response.data.data;
  },
};

export default CategoryService;